import {Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto} from "./user.dto";
import {AuthGuard} from "./auth.guard";

@Controller('kpiAuth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Get('logout')
    async logout() {
        return this.authService.logout();
    }
}