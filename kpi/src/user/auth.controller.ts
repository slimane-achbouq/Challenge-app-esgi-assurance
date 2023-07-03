import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './user.dto';
import { AuthGuard } from './auth.guard';
import { CreateUserValidationPipe } from './user.pipe';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('kpiAuth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern('signIn')
  async signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  //   @UsePipes(new CreateUserValidationPipe())
  //   @HttpCode(HttpStatus.OK)
  //   @Post('register')
  @MessagePattern('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  //   @UseGuards(AuthGuard)
  @MessagePattern('getProfile')
  getProfile(@Payload() req) {
    return req.user;
  }

  @MessagePattern('logout')
  async logout() {
    return this.authService.logout();
  }
}
