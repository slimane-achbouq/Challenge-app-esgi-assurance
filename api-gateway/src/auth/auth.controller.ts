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
import {
  ApiBearerAuth,
  ApiTags,
  ApiOkResponse,
  ApiBody,
} from '@nestjs/swagger';
import { Request } from 'express';
import { Role } from 'src/common/enums/roles.enum';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from '../common/guards/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { VerifyDto } from './dto/verify-profile.dto';
@ApiTags('Auth')
@Controller({
  path: 'auth',
})
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @ApiOkResponse({
    description: 'Add new user',
    type: CreateUserDto,
  })
  @ApiBody({
    description: 'Add new user',
    required: true,
    type: CreateUserDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userServiceClient
      .send({ cmd: 'singupCommande' }, createUserDto)
      .toPromise();
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.userServiceClient.send({ cmd: 'singIn' }, data).toPromise();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('verifyUser')
  verify(@Body() verifyDto: VerifyDto) {
    return this.userServiceClient
      .send({ cmd: 'verifyUser' }, verifyDto)
      .toPromise();
  }

  @HttpCode(HttpStatus.OK)
  @Get('logout')
  logout(@Req() req: Request) {
    return this.userServiceClient.send({ cmd: 'logout' }, req).toPromise();
  }
  
  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    return this.userServiceClient.send({ cmd: 'logout' }, req).toPromise();
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('getUsers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  getUsers(@Req() req) {
    return this.userServiceClient
      .send({ cmd: 'getUsers' }, { accessToken: req.headers.authorization })
      .toPromise();
  }
}
