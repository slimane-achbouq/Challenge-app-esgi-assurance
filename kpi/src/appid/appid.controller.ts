import { Body, Controller, Get, Headers, HttpCode, Post } from '@nestjs/common';
import { AppidService } from './appid.service';
import { Appid } from '../schemas/appid.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('appid')
export class AppidController {
  constructor(private readonly appidService: AppidService) {}

  @MessagePattern('createAppid')
  async createAppid(@Payload() appid: Appid) {
    return this.appidService.create(appid);
  }

  @MessagePattern('getTotalAppidsCount')
  async getTotalAppidsCount(@Payload() headers) {
    // const email = headers['email'];
    // return this.appidService.getAppidByEmail(email);
    return 'zakaria';
  }
}
