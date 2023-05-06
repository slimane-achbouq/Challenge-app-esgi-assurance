import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from './auth/jwt-auth.guard';


@Controller()
export class AppController {

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(): string {
    return "Hello";
  }

 
}
