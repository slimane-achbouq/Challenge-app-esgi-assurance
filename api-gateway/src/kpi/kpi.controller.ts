import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Headers,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Kpi')
@Controller({
  version: '1',
})
@SkipThrottle()
export class KpiController {
  constructor(
    @Inject('KPI_SERVICE') private readonly kpiService: ClientProxy,
  ) {}

  @Get('loloa')
  getHello() {
    return lastValueFrom(this.kpiService.send('getHello', ''));
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('visitor')
  async createVisitor(@Body() visitor: any) {
    return lastValueFrom(this.kpiService.send('createVisitor', visitor));
  }

  @HttpCode(HttpStatus.OK)
  @Get('visitor')
  async getUniqueVisitorsCount(@Headers() headers) {
    return lastValueFrom(
      this.kpiService.send('getUniqueVisitorsCount', headers),
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('visit')
  async createVisit(@Body() visit: any) {
    return lastValueFrom(this.kpiService.send('createVisit', visit));
  }

  @HttpCode(HttpStatus.OK)
  @Get('visit')
  async getTotalVisitsCount(@Headers() headers) {
    return lastValueFrom(
      this.kpiService.send('getTotalVisitsCount', headers['app-id']),
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('kpiAuth/login')
  async signIn(@Body() signInDto) {
    return lastValueFrom(this.kpiService.send('signIn', signInDto));
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('kpiAuth/register')
  async register(@Body() createUserDto: any) {
    return lastValueFrom(this.kpiService.send('register', createUserDto));
  }

  @HttpCode(HttpStatus.OK)
  @Get('kpiAuth/profile')
  getProfile(@Request() req) {
    return lastValueFrom(this.kpiService.send('getProfile', req));
  }

  @HttpCode(HttpStatus.OK)
  @Get('kpiAuth/logout')
  logout() {
    return lastValueFrom(this.kpiService.send('logout', ''));
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('time')
  async createTime(@Body() time: any) {
    return lastValueFrom(this.kpiService.send('createTime', time));
  }

  @HttpCode(HttpStatus.OK)
  @Get('time')
  getTotalSecondsByPage(@Headers() headers) {
    return lastValueFrom(
      this.kpiService.send('getTotalSecondsByPage', headers),
    );
  }

  @Post('tag')
  async createTag(@Body() tag) {
    return lastValueFrom(this.kpiService.send('createTag', tag));
  }

  @HttpCode(HttpStatus.OK)
  @Get('tag')
  async getAllTags(@Headers() headers) {
    return lastValueFrom(this.kpiService.send('getAllTags', headers));
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('kpi')
  async createKpi(@Body() kpi: any) {
    return lastValueFrom(this.kpiService.send('createKpi', kpi));
  }

  @HttpCode(HttpStatus.OK)
  @Get('kpi')
  getUniqueVisitorsCountKpi(@Headers() headers) {
    return lastValueFrom(
      this.kpiService.send('getUniqueVisitorsCountKpi', headers['app-id']),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('kpi/tag/:tag')
  getKpisByTag(@Body() tag: string) {
    return lastValueFrom(this.kpiService.send('getKpisByTag', tag));
  }

  @HttpCode(HttpStatus.OK)
  @Get('kpi/visitor/:visitor')
  getKpisByVisitor(@Body() visitor: string) {
    return lastValueFrom(this.kpiService.send('getKpisByVisitor', visitor));
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('device')
  async createDevice(@Body() device: any) {
    return lastValueFrom(this.kpiService.send('createDevice', device));
  }

  @HttpCode(HttpStatus.OK)
  @Get('device')
  getTotalDevicesCount(@Headers() headers) {
    return lastValueFrom(this.kpiService.send('getTotalDevicesCount', headers));
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('browser')
  async createBrowser(@Body() browser: any) {
    return lastValueFrom(this.kpiService.send('createBrowser', browser));
  }

  @HttpCode(HttpStatus.OK)
  @Get('browser')
  getTotalBrowsersCount(@Headers() headers) {
    return lastValueFrom(
      this.kpiService.send('getTotalBrowsersCount', headers),
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('appid')
  async createAppid(@Body() appid: any) {
    return lastValueFrom(this.kpiService.send('createAppid', appid));
  }

  @HttpCode(HttpStatus.OK)
  @Get('appid')
  getTotalAppidsCount(@Headers() headers) {
    return lastValueFrom(this.kpiService.send('getTotalAppidsCount', headers));
  }
}
