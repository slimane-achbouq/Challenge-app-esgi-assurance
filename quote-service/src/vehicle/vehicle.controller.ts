import {
    Controller,
    UseGuards,
    Post,
    Body,
    Get,
    Param,
    Put,
    Delete,
    UseInterceptors,
    UploadedFile,
    NotFoundException,
  } from '@nestjs/common';
  import { VehicleService } from './vehicle.service';
  import { Vehicle } from './vehicle.entity';
  import { MessagePattern, Payload } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { Express } from 'express';
import { diskStorage } from 'multer';


  
  @Controller('vehicle')
  export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}
  
    @MessagePattern({ cmd: 'createVehicle' })
    async createVehicle(vehicleDto: any): Promise<Vehicle> {
      return this.vehicleService.createVehicle(vehicleDto);
    }
  
    @MessagePattern({ cmd: 'getVehicles' })
    async getVehicles(): Promise<Vehicle[]> {
      return await this.vehicleService.getVehicles();
    }
  
    @MessagePattern({ cmd: 'getVehicleById' })
    async getVehicleById(@Payload() id: string): Promise<Vehicle> {
      return await this.vehicleService.getVehicleById(id);
    }
  
    @MessagePattern({ cmd: 'updateVehicle' })
    async updateVehicle(data: { id: string; vehicleDto: any }): Promise<Vehicle> {
      const { id, vehicleDto } = data;
      const vehicle = await this.vehicleService.getVehicleById(id);
      if (!vehicle) {
        throw new NotFoundException('Vehicle not found');
      }
      const updatedVehicle = await this.vehicleService.updateVehicle(id, vehicleDto);
      return updatedVehicle;
    }
  
    @MessagePattern({ cmd: 'deleteVehicle' })
    async deleteVehicle(@Payload() id: string): Promise<void> {
      return await this.vehicleService.deleteVehicle(id);
    }
  }
  