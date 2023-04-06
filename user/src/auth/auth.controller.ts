import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { User } from 'src/users/schemas/user.schema';

@ApiTags('Auth')
@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    description: 'Add new user',
    type: User,
  })
  @ApiBody({
    description: 'Add new user',
    required: true,
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }
}
