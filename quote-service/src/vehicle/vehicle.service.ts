import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async createVehicle(vehicleDto: any): Promise<Vehicle> {
    const newVehicle = this.vehicleRepository.save(vehicleDto);
    return newVehicle;
  }

  async getVehicles(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }

  async getVehicleById(id: string): Promise<Vehicle> {
    return this.vehicleRepository.findOneBy({ id });
  }

  async updateVehicle(id: string, vehicleDto: any): Promise<Vehicle> {
    await this.vehicleRepository.update(id, vehicleDto);
    return this.vehicleRepository.findOneBy({ id });
  }

  async deleteVehicle(id: string): Promise<void> {
    await this.vehicleRepository.delete(id);
  }
}
