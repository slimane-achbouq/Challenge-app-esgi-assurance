import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { Logger } from '@nestjs/common';

import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}




  @Get()
  getHello(): string {
    Logger.log('info')
    return this.appService.getHello();
  }

  @MessagePattern('get.insurance')
  async getInsuranceById(@Payload() id: string) {
    console.log("kkkkkkkkkk")
    Logger.log('info')
    return this.appService.getHello();
    
  } 
}
