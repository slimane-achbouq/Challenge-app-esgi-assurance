import { Body, Controller, Get, Headers, HttpCode, Post } from '@nestjs/common';
import { Time } from '../schemas/time.schema';
import { TimeService } from './time.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @MessagePattern('createTime')
  async createTime(@Payload() time: Time) {
    return this.timeService.create(time);
  }

  @MessagePattern('getTotalSecondsByPage')
  async getTotalSecondsByPage(@Payload() headers) {
    const app_id = headers['app-id'];
    return await this.timeService.getTotalSecondsByPage(app_id);
  }
}
