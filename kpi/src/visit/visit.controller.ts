import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { VisitService } from './visit.service';
import { Visit } from '../schemas/visit.schema';
import { Headers } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @MessagePattern('createVisit')
  async createVisit(@Body() visit: Visit) {
    return this.visitService.create(visit);
  }

  // Get total unique Visits
  /*@Get()
    @HttpCode(200)
    async getUniqueVisitsCount(@Body() body: { app_id: string }) {
        const { app_id } = body;
        return this.visitService.getTotalDistinctVisits(app_id);
    }*/

  @MessagePattern('getTotalVisitsCount')
  async getTotalVisitsCount(appId: string) {
    return this.visitService.getTotalVisitsByAppId(appId);
  }
}
