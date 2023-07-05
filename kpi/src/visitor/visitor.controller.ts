import { Body, Controller, Get, Headers, HttpCode, Post } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { Visitor } from '../schemas/visitor.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @MessagePattern('createVisitor')
  async createVisitor(@Body() visitor: Visitor) {
    return this.visitorService.create(visitor);
  }

  // @AuthenticationRequired()
  // @HasRole(Role.ADMINISTRATOR)
  @MessagePattern('getUniqueVisitorsCount')
  async getUniqueVisitorsCount(@Payload() headers) {
    const app_id = headers['app-id'];
    return this.visitorService.getTotalDistinctVisitors(app_id);
  }
}
