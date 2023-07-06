import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { DeviceService } from './device.service';
import { Device } from '../schemas/device.schema';
import { Headers } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @MessagePattern('createDevice')
  async createDevice(@Payload() device: Device) {
    return this.deviceService.create(device);
  }

  @MessagePattern('getTotalDevicesCount')
  async getTotalDevicesCount(@Payload() headers) {
    const app_id = headers['app-id'];
    return this.deviceService.getTotalDevicesByAppId(app_id);
  }
}
