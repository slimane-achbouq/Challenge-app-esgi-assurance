import { Module } from '@nestjs/common';
import { DemandController } from './demand.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Demand, DemandSchema} from "../schema/demand.schema";
import {DemandService} from "./demand.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Demand.name, schema: DemandSchema }]),
  ],
  providers: [DemandService],
  controllers: [DemandController]
})
export class DemandModule {}
