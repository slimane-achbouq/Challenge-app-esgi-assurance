import {Body, Controller, Get, HttpCode, Post} from '@nestjs/common';
import {DeviceService} from "./device.service";
import {Device} from "../schemas/device.schema";
import { Headers } from '@nestjs/common';

@Controller("device")
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) {
    }

    @Post()
    async createDevice(@Body() device: Device) {
        return this.deviceService.create(device);
    }

    @Get()
    @HttpCode(200)
    async getTotalDevicesCount(@Headers() headers) {
        const app_id = headers["app-id"];
        return this.deviceService.getTotalDevicesByAppId(app_id);
    }
}