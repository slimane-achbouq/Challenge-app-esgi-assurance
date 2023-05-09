import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Role } from 'src/common/enums/roles.enum';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from '../common/guards/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('Auth')
@Controller({
  path: 'auth',
})
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signup(@Body() createUserDto: any) {
    return this.userServiceClient
      .send({ cmd: 'singupCommande' }, createUserDto)
      .toPromise();
  }

  @Post('signin')
  signin(@Body() data: any) {
    return this.userServiceClient.send({ cmd: 'singIn' }, data).toPromise();
  }

  @Post('verifyUser')
  verify(@Body() verifyDto: any) {
    return this.userServiceClient
      .send({ cmd: 'verifyUser' }, verifyDto)
      .toPromise();
  }

  @Get('logout')
  logout(@Req() req: Request) {
    return this.userServiceClient.send({ cmd: 'logout' }, req).toPromise();
  }

  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    return this.userServiceClient.send({ cmd: 'logout' }, req).toPromise();
  }

  @ApiBearerAuth()
  @Get('getUsers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  getUsers(@Req() req) {
    return this.userServiceClient
      .send({ cmd: 'getUsers' }, { accessToken: req.headers.authorization })
      .toPromise();
  }
}
