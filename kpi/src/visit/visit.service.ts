import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Visit} from "../schemas/visit.schema";

@Injectable()
export class VisitService {
    constructor(@InjectModel('Visit') private readonly visitModel: Model<Visit>) {
    }

    async create(dataVisit: Visit): Promise<Visit> {
        const createdVisit = new this.visitModel(dataVisit);
        return createdVisit.save();
    }

    async getTotalDistinctVisits(appId: string): Promise<number> {
        const distinctVisits = await this.visitModel.distinct('id_visit', { app_id: appId });
        return distinctVisits.length;
    }

    async getTotalVisitsByAppId(appId: string): Promise<number> {
        const visits = await this.visitModel.find({ app_id: appId });
        return visits.length;
    }
}
