import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, now} from "mongoose";
import {Demand} from "../schema/demand.schema";
import {CreateDemandDto} from "./demand.dto";

@Injectable()
export class DemandService {
    constructor(@InjectModel('Demand') private readonly demandModel: Model<Demand>) {
    }

    async create(createDemandDto: CreateDemandDto): Promise<Demand> {
        const createdDemand = new this.demandModel(createDemandDto);
        return createdDemand.save();
    }

    async updateDemand(demandId: string, decision: string, additionalInfo: string): Promise<Demand> {
        const updatedDemand = await this.demandModel.findByIdAndUpdate(
            demandId,
            {decision, additionalInfo, updatedAt: now()},
            {new: true}
        );

        return updatedDemand;
    }
}