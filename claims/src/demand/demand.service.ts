import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {HydratedDocument, Model, now} from 'mongoose';
import {Demand} from '../schema/demand.schema';
import {UpdateDemandDto} from '../dto/update-demand.dto';
import {CreateDemandDto} from 'src/dto/create-demand.dto';
import { createGzip, createGunzip } from 'zlib';

@Injectable()
export class DemandService {
    constructor(
        @InjectModel('Demand') private readonly demandModel: Model<Demand>
    ) {
    }

    /*async create(createDemandDto: CreateDemandDto): Promise<Demand> {

        const {proof, ...rest} = createDemandDto;
        // Save the base64 encoded file
        const fileContent = Buffer.from(proof, 'base64');
        const createdDemand = new this.demandModel({...rest, proof: fileContent});
        return createdDemand.save();
    }*/

    async create(createDemandDto: CreateDemandDto): Promise<Demand> {
        const { proof, ...rest } = createDemandDto;

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

        const createdDemand = new this.demandModel({ ...rest, proof: compressedContent });
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
            throw new Error(
                'Demand not found with this id : ' + id,
            );
        }

        const {proof, ...rest} = updateDemandDto;

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
        return this.demandModel.findByIdAndDelete(id).exec();
    }
}
