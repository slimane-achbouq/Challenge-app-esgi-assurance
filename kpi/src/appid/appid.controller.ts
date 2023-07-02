import {Body, Controller, Get, Headers, HttpCode, Post} from '@nestjs/common';
import {AppidService} from "./appid.service";
import {Appid} from "../schemas/appid.schema";

@Controller("appid")
export class AppidController {
    constructor(private readonly appidService: AppidService) {
    }

    @Post()
    async createAppid(@Body() appid: Appid) {
        return this.appidService.create(appid);
    }

    @Get()
    @HttpCode(200)
    async getTotalAppidsCount(@Headers() headers) {
        const email = headers["email"];
        return this.appidService.getAppidByEmail(email);
    }
}