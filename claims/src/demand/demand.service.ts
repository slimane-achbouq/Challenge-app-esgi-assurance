import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {HydratedDocument, Model, now} from 'mongoose';
import {Demand} from '../schema/demand.schema';
import {UpdateDemandDto} from '../dto/update-demand.dto';
import {CreateDemandDto} from 'src/dto/create-demand.dto';
import {createGzip, createGunzip} from 'zlib';
import {WinstonModule} from "nest-winston";
import {format, transports} from "winston";

@Injectable()
export class DemandService {
    private logger = null;

    constructor(
        @InjectModel('Demand') private readonly demandModel: Model<Demand>
    ) {
        // Init logger
        this.logger = WinstonModule.createLogger({
            transports: [
                new transports.File({
                    level: 'debug',
                    filename: 'logs/debug.log',
                    format: format.combine(format.timestamp(), format.json()),
                }),
                new transports.File({
                    level: 'error',
                    filename: 'logs/error.log',
                    format: format.combine(format.timestamp(), format.json()),
                }),
                new transports.Console({
                    format: format.combine(
                        format.colorize({message: true}),
                    )
                }),
            ]
        });
    }

    async create(createDemandDto: CreateDemandDto): Promise<Demand> {
        const {proof, ...rest} = createDemandDto;

        // Compress the file content using gzip
        const compressedContent = await new Promise<Buffer>((resolve, reject) => {
            const gzip = createGzip();
            const buffers: Buffer[] = [];

            gzip.on('error', reject);
            gzip.on('data', (data: Buffer) => buffers.push(data));
            gzip.on('end', () => resolve(Buffer.concat(buffers)));

            gzip.write(Buffer.from(proof, 'base64'));
            gzip.end();
        });

        this.logger.debug("debug", "createClaim : new claim for insurance " + createDemandDto.insurance_id);
        const createdDemand = new this.demandModel({...rest, proof: compressedContent});
        return createdDemand.save();
    }

    async findAll(): Promise<Demand[]> {
        return this.demandModel.find().exec();
    }

    async findAllWithoutProof(): Promise<Demand[]> {
        return this.demandModel.find({}, {proof: 0}).exec();
    }

    async findById(id: string): Promise<Demand> {
        const claim = await this.demandModel.findById(id).exec();

        const buffers = [];
        const gunzip = createGunzip();

        const decompressedContent = await new Promise<Buffer>((resolve, reject) => {
            gunzip.on('error', reject);
            gunzip.on('data', (data: Buffer) => buffers.push(data));
            gunzip.on('end', () => resolve(Buffer.concat(buffers)));

            gunzip.write(claim.proof);
            gunzip.end();
        });

        claim.proof = decompressedContent;
        return claim;
    }

    async updateDemand(
        updateDemandDto: UpdateDemandDto
    ): Promise<Demand> {
        const id = updateDemandDto.id
        const existingDemand = await this.demandModel.findById(id);

        if (!existingDemand) {
            this.logger.error("updateClaim attempt : claim ID " + id + " not found");
            throw new Error(
                'Demand not found with this id : ' + id,
            );
        }

        const {proof, ...rest} = updateDemandDto;

        this.logger.debug("debug", "updateClaim : claim " + id + " updated");
        if (proof) {
            // Decode the base64 file content
            const fileContent = Buffer.from(proof, 'base64');

            return await this.demandModel.findByIdAndUpdate(
                existingDemand['_id'],
                {...rest, proof: fileContent, updatedAt: now()},
                {new: true},
            );

        } else {
            // If no new file is uploaded, just update the other vehicle details
            return await this.demandModel.findByIdAndUpdate(
                existingDemand['_id'],
                {...rest, updatedAt: now()},
                {new: true},
            );

        }

    }

    async deleteDemand(id: string): Promise<Demand> {
        this.logger.debug("debug", "deleteClaim : claim " + id + " deleted");
        return this.demandModel.findByIdAndDelete(id).exec();
    }
}
