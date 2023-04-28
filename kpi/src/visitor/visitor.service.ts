import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Visitor} from "../schemas/visitor.schema";

@Injectable()
export class VisitorService {
    constructor(@InjectModel('Visitor') private readonly visitorModel: Model<Visitor>) {
    }

    async create(dataVisitor: Visitor): Promise<Visitor> {
        const createdVisitor = new this.visitorModel(dataVisitor);
        return createdVisitor.save();
    }
}
