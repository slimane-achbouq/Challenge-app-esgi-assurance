import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import * as fs from 'fs';
import * as path from 'path';
import { CreateVehicleDto } from './vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async createVehicle(vehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const { carteGrise, ...rest } = vehicleDto;

    // Save the base64 encoded file
    const fileContent = Buffer.from(carteGrise, 'base64');

    // Save the vehicle with the file path
    const newVehicle = this.vehicleRepository.save({ ...rest, carteGrise: fileContent })
    return newVehicle;
  }


  async getVehicles(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }

  async getVehicleById(id: string): Promise<Vehicle> {
    return this.vehicleRepository.findOneBy({ id });
  }

  async updateVehicle(id: string, vehicleDto: any): Promise<Vehicle> {
    const { carteGrise, ...rest } = vehicleDto;
    const vehicle = await this.vehicleRepository.findOneBy({ id });
  
    // If a new file is uploaded, decode it and save it as a blob
    if (carteGrise) {
      // Decode the base64 file content
      const fileContent = Buffer.from(carteGrise, 'base64');
  
      // Update the vehicle with the new file content
      await this.vehicleRepository.update(id, { ...rest, carteGrise: fileContent });
    } else {
      // If no new file is uploaded, just update the other vehicle details
      await this.vehicleRepository.update(id, rest);
    }
  
    const updatedVehicle = await this.vehicleRepository.findOneBy({ id });
    return updatedVehicle;
  }

  async deleteVehicle(id: string): Promise<void> {
    await this.vehicleRepository.delete(id);
  }
}
