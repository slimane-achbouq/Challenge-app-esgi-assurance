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
  BadRequestException,
  UsePipes,
  ValidationPipe,
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
import { RpcException } from '@nestjs/microservices';
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
  @UsePipes(ValidationPipe)
  signup(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.isValide) {
      throw new BadRequestException('Request invalid');
    }

    if (createUserDto.roles && createUserDto.roles.includes('Admin')) {
      throw new BadRequestException('Request invalid');
    }

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
  @SkipThrottle()
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

  @Put('update-user-admin')
  @UseGuards(JwtAuthGuard, RolesGuard, ProfileValidationGuard)
  @Roles(Role.ADMIN)
  async updateUserByAdmin(@Req() req, @Body() updateUserDto): Promise<any> {
    return this.userServiceClient
      .send(
        { cmd: 'updateUser' },
        { id: updateUserDto.id, updateUserDto: updateUserDto },
      )
      .toPromise();
  }

  @Put('update-user')
  @UseGuards(JwtAuthGuard)
  @SkipThrottle()
  async updateUser(@Req() req, @Body() updateUserDto): Promise<any> {
    const disallowedFields = ['roles', 'isValide'];

    const containsDisallowedFields = disallowedFields.some(
      (field) => field in updateUserDto,
    );

    if (containsDisallowedFields) {
      throw new BadRequestException('Request invalid');
    }

    return this.userServiceClient
      .send(
        { cmd: 'updateUser' },
        { id: updateUserDto.id, updateUserDto: updateUserDto },
      )
      .toPromise();
  }

  @HttpCode(HttpStatus.OK)
  @Post('updatePassword')
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.userServiceClient
      .send({ cmd: 'updatePassword' }, updatePasswordDto)
      .toPromise();
  }

  @HttpCode(HttpStatus.OK)
  @Post('resetPassword')
  @SkipThrottle() 
  resetPassword(@Body() resetPassword: ResetPasswordDto) {
    return this.userServiceClient
      .send({ cmd: 'resetPassword' }, resetPassword)
      .toPromise();
  }

  @Delete('delete-user/:id')
  @UseGuards(JwtAuthGuard, RolesGuard, ProfileValidationGuard)
  @Roles(Role.ADMIN)
  async deleteUser(@Param('id') id: string) {
    // Check if quote exists
    const existingQuote = await this.userServiceClient
      .send({ cmd: 'deleteUserById' }, { id: id })
      .toPromise();
  }
}
