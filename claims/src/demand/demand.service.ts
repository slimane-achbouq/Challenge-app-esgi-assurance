import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Demand} from "../schema/demand.schema";

@Injectable()
export class DemandService {
    constructor(@InjectModel('Demand') private readonly demandModel: Model<Demand>) {
    }

    async create(dataDemand: Demand): Promise<Demand> {
        const createdDemand = new this.demandModel(dataDemand);
        return createdDemand.save();
    }

    async updateDemand(demandId: string, decision: string, additionalInfo: string): Promise<Demand> {
        const updatedDemand = await this.demandModel.findByIdAndUpdate(
            demandId,
            {decision, additionalInfo},
            {new: true}
        );

        return updatedDemand;
    }
}