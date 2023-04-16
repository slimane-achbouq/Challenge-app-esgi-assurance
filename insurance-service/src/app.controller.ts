import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

import { Logger } from '@nestjs/common';

import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { InsuranceService } from './insurance/insurance.service';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService,@Inject(InsuranceService) private readonly insuranceService: InsuranceService) {}


  @Get()
  getHello(): string {
    Logger.log('info')
    return this.appService.getHello();
  }

 

}
