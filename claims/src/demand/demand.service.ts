import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {HydratedDocument, Model, now} from 'mongoose';
import {Demand} from '../schema/demand.schema';
import {UpdateDemandDto} from '../dto/update-demand.dto';
import {CreateDemandDto} from 'src/dto/create-demand.dto';

@Injectable()
export class DemandService {
    constructor(
        @InjectModel('Demand') private readonly demandModel: Model<Demand>
    ) {
    }

    async create(createDemandDto: CreateDemandDto): Promise<Demand> {

        const {proof, ...rest} = createDemandDto;
        // Save the base64 encoded file
        const fileContent = Buffer.from(proof, 'base64');
        const createdDemand = new this.demandModel({...rest, proof: fileContent});
        return createdDemand.save();
    }

    async findAll(): Promise<Demand[]> {
        return this.demandModel.find().exec();
    }

    async findById(id: string): Promise<Demand> {
        return this.demandModel.findById(id).exec();
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
}
