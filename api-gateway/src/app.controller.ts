import { Controller, Get, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {

  constructor(@Inject('ITEM_MICROSERVICE') private client: ClientProxy,private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('insurance/:id')
  async getInsurance(@Param('id') id: string) {
    return this.client.send({ cmd: 'hello' }, id);
  }
}
