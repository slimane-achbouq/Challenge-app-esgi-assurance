import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';

// @ApiTags('Auth')
@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'singupCommande' })
  signup(@Payload() createUserDto: CreateUserDto): Promise<any> {
    try {
      return this.authService.signUp(createUserDto);
    } catch (err) {
      return err.response;
    }
  }

  @MessagePattern({ cmd: 'singIn' })
  async signin(@Payload() data: AuthDto) {
    try {
      return await this.authService.signIn(data);
    } catch (err) {
      return err.response;
    }
  }

  @MessagePattern({ cmd: 'verifyUser' })
  @Post('verifyUser')
  verify(@Payload() verifyDto: any) {
    try {
      return this.authService.verifyProfile(verifyDto);
    } catch (err) {
      return err.response;
    }
  }

  @MessagePattern({ cmd: 'logout' })
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    try {
      this.authService.logout(req.user['sub']);
    } catch (err) {
      return err.response;
    }
  }

  @MessagePattern({ cmd: 'refresh' })
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    try {
      return this.authService.refreshTokens(userId, refreshToken);
    } catch (err) {
      return err.response;
    }
  }
}
