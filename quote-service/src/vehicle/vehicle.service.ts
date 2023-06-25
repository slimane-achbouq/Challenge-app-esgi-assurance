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


    async calculateInsurancePremiums(id: string): Promise<number[]> {

      const currentVehicle = await this.vehicleRepository.findOneBy({ id });
      let { horsepower, vehicleCirculationDate, registrationCardDate } = currentVehicle;
    
      // Calculate the age of the vehicle
      vehicleCirculationDate = new Date(vehicleCirculationDate)
      const vehicleAge = new Date().getFullYear() - vehicleCirculationDate.getFullYear();
    
      // Calculate the years since the registration card date
      registrationCardDate = new Date(registrationCardDate)
      const registrationCardAge = new Date().getFullYear() - registrationCardDate.getFullYear();
    
      // Base price
      let basePrice = 12;
    
      // Apply a discount or increase based on horsepower
      if (horsepower < 100) {
        basePrice *= 0.5; // 10% discount for vehicles with less than 100 horsepower
      } else if (horsepower > 200) {
        basePrice *= 1.4; // 20% increase for vehicles with more than 200 horsepower
      }
    
      // Apply a discount or increase based on the age of the vehicle
      if (vehicleAge < 5) {
        basePrice *= 0.85; // 5% discount for vehicles less than 5 years old
      } else if (vehicleAge > 10) {
        basePrice *= 1.2; // 10% increase for vehicles more than 10 years old
      }
    
      // Apply a discount or increase based on the age of the registration card
      if (registrationCardAge < 1) {
        basePrice *= 0.95; // 5% discount for registration cards less than 1 year old
      } else if (registrationCardAge > 5) {
        basePrice *= 1; // 10% increase for registration cards more than 5 years old
        
      }

      const minPremium = 15;
      const maxPremium = 35;

    
      // Return three price suggestions: base price, base price + 10%, base price + 20%
      return [basePrice, basePrice * 1.1, basePrice * 1.2];
    }
}
