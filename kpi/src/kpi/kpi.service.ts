import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Kpi} from "../schemas/kpi.schema";

@Injectable()
export class KpiService {
    constructor(@InjectModel('Kpi') private readonly kpiModel: Model<Kpi>) {
    }

    async create(dataKpi: Kpi): Promise<Kpi> {
        const createdKpi = new this.kpiModel(dataKpi);
        return createdKpi.save();
    }

    async findAll(): Promise<Kpi[]> {
        return this.kpiModel.find().exec();
    }

    async findKpisByTag(tag: string): Promise<Kpi[]> {
        return this.kpiModel.find({tag: tag}).exec();
    }

    async findKpisByVisitor(visitor: string): Promise<Kpi[]> {
        return this.kpiModel.find({visitor: visitor}).exec();
    }
}
