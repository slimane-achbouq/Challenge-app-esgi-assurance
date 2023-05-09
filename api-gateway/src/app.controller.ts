import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(): string {
    return 'Hello';
  }
}
