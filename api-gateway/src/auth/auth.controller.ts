import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Put,
  Param,
  UseGuards,
  Delete,
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
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from '../common/guards/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { VerifyDto } from './dto/verify-profile.dto';
import { ProfileValidationGuard } from 'src/common/guards/profile-validation.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
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
  @Throttle(2, 30)
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userServiceClient
      .send({ cmd: 'singupCommande' }, createUserDto)
      .toPromise();
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @SkipThrottle()
  signin(@Body() data: AuthDto) {
    return this.userServiceClient.send({ cmd: 'singIn' }, data).toPromise();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('verifyUser')
  @SkipThrottle()
  verify(@Body() verifyDto: VerifyDto) {
    return this.userServiceClient
      .send({ cmd: 'verifyUser' }, verifyDto)
      .toPromise();
  }

  @HttpCode(HttpStatus.OK)
  @Get('logout')
  @SkipThrottle()
  logout(@Req() req: Request) {
    return this.userServiceClient.send({ cmd: 'logout' }, req).toPromise();
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  @Throttle(2, 60)
  refreshTokens(@Req() req: Request) {
    return this.userServiceClient.send({ cmd: 'logout' }, req).toPromise();
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('getUsers')
  @UseGuards(JwtAuthGuard, RolesGuard, ProfileValidationGuard)
  @Roles(Role.ADMIN)
  @SkipThrottle()
  getUsers(@Req() req) {
    return this.userServiceClient
      .send({ cmd: 'getUsers' }, { accessToken: req.headers.authorization })
      .toPromise();
  }

  @Put('update-user')
  @UseGuards(JwtAuthGuard)
  @Throttle(5, 60)
  async updateUser(@Req() req, @Body() updateUserDto): Promise<any> {
    return this.userServiceClient
      .send(
        { cmd: 'updateUser' },
        { id: updateUserDto.id, updateUserDto: updateUserDto },
      )
      .toPromise();
  }

  @HttpCode(HttpStatus.OK)
  @Post('updatePassword')
  @Throttle(3, 60)
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.userServiceClient
      .send({ cmd: 'updatePassword' }, updatePasswordDto)
      .toPromise();
  }

  @HttpCode(HttpStatus.OK)
  @Post('resetPassword')
  @Throttle(3, 60)
  resetPassword(@Body() resetPassword: ResetPasswordDto) {
    return this.userServiceClient
      .send({ cmd: 'resetPassword' }, resetPassword)
      .toPromise();
  }

  @Delete('delete-user/:id')
  @Throttle(5, 60)
  async deleteUser(@Param('id') id: string) {
    // Check if quote exists
    const existingQuote = await this.userServiceClient
      .send({ cmd: 'deleteUserById' }, { id: id })
      .toPromise();
  }
}
