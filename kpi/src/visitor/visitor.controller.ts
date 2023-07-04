import { Body, Controller, Get, Headers, HttpCode, Post } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { Visitor } from '../schemas/visitor.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @MessagePattern('createVisitor')
  async createVisitor(@Body() visitor: Visitor) {
    console.log('setp 2', visitor)
    return this.visitorService.create(visitor);
  }

  // @AuthenticationRequired()
  // @HasRole(Role.ADMINISTRATOR)
  @MessagePattern('getUniqueVisitorsCount')
  async getUniqueVisitorsCount(@Payload() headers) {
    console.log('step 2');
    const app_id = headers['app-id'];
    console.log('step 3', app_id);
    return this.visitorService.getTotalDistinctVisitors(app_id);
  }
}
