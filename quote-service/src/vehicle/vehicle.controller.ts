import {
    Controller,
    UseGuards,
    Post,
    Body,
    Get,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { VehicleService } from './vehicle.service';
  import { Vehicle } from './vehicle.entity';
  import { MessagePattern, Payload } from '@nestjs/microservices';
  
  @Controller('vehicle')
  export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}
  
    @MessagePattern({ cmd: 'createVehicle' })
    async createVehicle(@Payload() vehicleDto: any): Promise<Vehicle> {
      return await this.vehicleService.createVehicle(vehicleDto);
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
    async updateVehicle(@Payload() data: any): Promise<Vehicle> {
      const { id, vehicleDto } = data;
      return await this.vehicleService.updateVehicle(id, vehicleDto);
    }
  
    @MessagePattern({ cmd: 'deleteVehicle' })
    async deleteVehicle(@Payload() id: string): Promise<void> {
      return await this.vehicleService.deleteVehicle(id);
    }
  }
  