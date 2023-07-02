import {Body, Controller, Get, HttpCode, Post} from '@nestjs/common';
import {BrowserService} from "./browser.service";
import {Browser} from "../schemas/browser.schema";
import { Headers } from '@nestjs/common';

@Controller("browser")
export class BrowserController {
    constructor(private readonly browserService: BrowserService) {
    }

    @Post()
    async createBrowser(@Body() browser: Browser) {
        return this.browserService.create(browser);
    }

    @Get()
    @HttpCode(200)
    async getTotalBrowsersCount(@Headers() headers) {
        const app_id = headers["app-id"];
        return this.browserService.getTotalBrowsersByAppId(app_id);
    }
}