import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { Browser } from '../schemas/browser.schema';
import { Headers } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('browser')
export class BrowserController {
  constructor(private readonly browserService: BrowserService) {}

  @MessagePattern('createBrowser')
  async createBrowser(@Body() browser: Browser) {
    return this.browserService.create(browser);
  }

  @MessagePattern('getTotalBrowsersCount')
  async getTotalBrowsersCount(@Payload() headers) {
    const app_id = headers['app-id'];
    return this.browserService.getTotalBrowsersByAppId(app_id);
  }
}
