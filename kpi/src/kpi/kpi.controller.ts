import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { KpiService } from './kpi.service';
import { Kpi } from '../schemas/kpi.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from '../schemas/tag.schema';
import { Model } from 'mongoose';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('kpi')
export class KpiController {
  constructor(private readonly kpiService: KpiService) {}

  @MessagePattern('createKpi')
  async createKpi(@Payload() kpi: Kpi) {
    return this.kpiService.create(kpi);
  }

  @MessagePattern('getUniqueVisitorsCountKpi')
  async getUniqueVisitorsCount(appId: string) {
    return this.kpiService.findAllKpis(appId);
  }

  @MessagePattern('getKpisByTag')
  async getKpisByTag(@Payload() tag: string) {
    return this.kpiService.findKpisByTag(tag);
  }

  @MessagePattern('getKpisByVisitor')
  async getKpisByVisitor(@Payload() visitor: string) {
    return this.kpiService.findKpisByVisitor(visitor);
  }
}
