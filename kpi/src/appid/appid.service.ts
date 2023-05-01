import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Appid} from "../schemas/appid.schema";

@Injectable()
export class AppidService {
    constructor(@InjectModel('Appid') private readonly appidModel: Model<Appid>) {
    }

    async create(dataAppid: Appid): Promise<Appid> {
        const createdAppid = new this.appidModel(dataAppid);
        return createdAppid.save();
    }

    async getAppidByEmail(email: string): Promise<Appid[]> {
        return this.appidModel.find({mail: email}).exec();
    }
}
