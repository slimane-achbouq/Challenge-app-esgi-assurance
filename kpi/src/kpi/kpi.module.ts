import { Module } from '@nestjs/common';
import { KpiService } from './kpi.service';
import { KpiController } from './kpi.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Kpi, KpiSchema} from "../schemas/kpi.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Kpi.name, schema: KpiSchema }]),
  ],
  providers: [KpiService],
  controllers: [KpiController]
})
export class KpiModule {}
