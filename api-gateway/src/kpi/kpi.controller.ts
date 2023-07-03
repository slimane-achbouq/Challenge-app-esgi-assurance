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

@ApiTags('Kpi')
@Controller({
  version: '1',
})
export class KpiController {
  constructor(
    @Inject('KPI_SERVICE') private readonly kpiService: ClientProxy,
  ) {}
  @HttpCode(HttpStatus.CREATED)
  @Post('visitor')
  async createVisitor(@Body() visitor: any) {
    return this.kpiService.send({ cmd: 'createVisitor' }, visitor).toPromise;
  }

  @HttpCode(HttpStatus.OK)
  @Get('visitor')
  async getUniqueVisitorsCount(@Headers() headers) {
    const app_id = headers['app-id'];
    return this.kpiService.send({ cmd: 'getUniqueVisitorsCount' }, app_id)
      .toPromise;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('visit')
  async createVisit(@Body() visit: any) {
    return this.kpiService.send({ cmd: 'createVisit' }, visit).toPromise;
  }

  @HttpCode(HttpStatus.OK)
  @Get('visit')
  async getTotalVisitsCount(@Headers() headers) {
    return this.kpiService.send({ cmd: 'getTotalVisitsCount' }, headers)
      .toPromise;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('kpiAuth/login')
  async signIn(@Body() signInDto: Record<string, any>) {
    return this.kpiService.send({ cmd: 'signIn' }, signInDto).toPromise;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('kpiAuth/register')
  async register(@Body() createUserDto: any) {
    return this.kpiService.send({ cmd: 'register' }, createUserDto).toPromise;
  }

  @HttpCode(HttpStatus.OK)
  @Get('kpiAuth/profile')
  getProfile(@Request() req) {
    return this.kpiService.send({ cmd: 'getProfile' }, req).toPromise;
  }

  @HttpCode(HttpStatus.OK)
  @Get('kpiAuth/logout')
  logout() {
    return this.kpiService.send({ cmd: 'logout' }, '').toPromise;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('time')
  async createTime(@Body() time: any) {
    return this.kpiService.send({ cmd: 'createTime' }, time).toPromise;
  }

  @HttpCode(HttpStatus.OK)
  @Get('time')
  getTotalSecondsByPage(@Headers() headers) {
    return this.kpiService.send({ cmd: 'getTotalSecondsByPage' }, headers)
      .toPromise;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('tag')
  async createTag(@Body() tag: any) {
    return this.kpiService.send({ cmd: 'createTag' }, tag).toPromise;
  }

  @HttpCode(HttpStatus.OK)
  @Get('tag')
  getAllTags(@Headers() headers) {
    return this.kpiService.send({ cmd: 'getAllTags' }, headers).toPromise;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('kpi')
  async createKpi(@Body() kpi: any) {
    return this.kpiService.send({ cmd: 'createKpi' }, kpi).toPromise;
  }

  @HttpCode(HttpStatus.OK)
  @Get('kpi')
  getUniqueVisitorsCountKpi(@Headers() headers) {
    return this.kpiService.send({ cmd: 'getUniqueVisitorsCountKpi' }, headers)
      .toPromise;
  }

  @HttpCode(HttpStatus.OK)
  @Get('kpi/tag/:tag')
  getKpisByTag(@Body() tag: string) {
    return this.kpiService.send({ cmd: 'getKpisByTag' }, tag).toPromise;
  }

  @HttpCode(HttpStatus.OK)
  @Get('kpi/visitor/:visitor')
  getKpisByVisitor(@Body() visitor: string) {
    return this.kpiService.send({ cmd: 'getKpisByVisitor' }, visitor).toPromise;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('device')
  async createDevice(@Body() device: any) {
    return this.kpiService.send({ cmd: 'createDevice' }, device).toPromise;
  }

  @HttpCode(HttpStatus.OK)
  @Get('device')
  getTotalDevicesCount(@Headers() headers) {
    return this.kpiService.send({ cmd: 'getTotalDevicesCount' }, headers)
      .toPromise;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('browser')
  async createBrowser(@Body() browser: any) {
    return this.kpiService.send({ cmd: 'createBrowser' }, browser).toPromise;
  }

  @HttpCode(HttpStatus.OK)
  @Get('browser')
  getTotalBrowsersCount(@Headers() headers) {
    return this.kpiService.send({ cmd: 'getTotalBrowsersCount' }, headers)
      .toPromise;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('appid')
  async createAppid(@Body() appid: any) {
    return this.kpiService.send({ cmd: 'createAppid' }, appid).toPromise;
  }

  @HttpCode(HttpStatus.OK)
  @Get('appid')
  getTotalAppidsCount(@Headers() headers) {
    return this.kpiService.send({ cmd: 'getTotalAppidsCount' }, headers)
      .toPromise;
  }
}
