import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './quote.entity';
import { CreateQuoteDto, UpdateQuoteDto } from './quote.dto';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import { VehicleService } from 'src/vehicle/vehicle.service';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
    private readonly vehicleService: VehicleService,
  ) {}

  async createQuote(quoteDto: CreateQuoteDto): Promise<Quote> {
    // Find the vehicle by its ID
    const vehicle = await this.vehicleService.getVehicleById(
      quoteDto.vehicleId,
    );

    // Check if the vehicle exists
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    // Create a new quote and assign the vehicle to it
    const newQuote = this.quoteRepository.save({
      ...quoteDto,
      vehicle,
    });

    return newQuote;
  }

  async getQuotes(): Promise<Quote[]> {
    return this.quoteRepository
        .createQueryBuilder('quote')
        .leftJoinAndSelect('quote.vehicle', 'vehicle')
        .getMany();
}

  async getQuoteById(id: string): Promise<Quote> {
    return this.quoteRepository
      .createQueryBuilder('quote')
      .leftJoinAndSelect('quote.vehicle', 'vehicle')
      .where('quote.id = :id', { id })
      .getOne();
  }

  async updateQuote(id: string, quoteDto: UpdateQuoteDto): Promise<Quote> {
    const fieldName = 'id';
    await this.quoteRepository.update({ [fieldName]: id }, quoteDto);
    return this.quoteRepository.findOneBy({ id: id });
  }

  async deleteQuote(id: number): Promise<void> {
    await this.quoteRepository.delete(id);
  }

  calculateInsurancePremiums(vehicle: Vehicle): number[] {
    const { horsepower, vehicleCirculationDate, registrationCardDate } = vehicle;
  
    // Calculate the age of the vehicle
    const vehicleAge = new Date().getFullYear() - vehicleCirculationDate.getFullYear();
  
    // Calculate the years since the registration card date
    const registrationCardAge = new Date().getFullYear() - registrationCardDate.getFullYear();
  
    // Base price
    let basePrice = 1000;
  
    // Apply a discount or increase based on horsepower
    if (horsepower < 100) {
      basePrice *= 0.9; // 10% discount for vehicles with less than 100 horsepower
    } else if (horsepower > 200) {
      basePrice *= 1.2; // 20% increase for vehicles with more than 200 horsepower
    }
  
    // Apply a discount or increase based on the age of the vehicle
    if (vehicleAge < 5) {
      basePrice *= 0.95; // 5% discount for vehicles less than 5 years old
    } else if (vehicleAge > 10) {
      basePrice *= 1.1; // 10% increase for vehicles more than 10 years old
    }
  
    // Apply a discount or increase based on the age of the registration card
    if (registrationCardAge < 1) {
      basePrice *= 0.95; // 5% discount for registration cards less than 1 year old
    } else if (registrationCardAge > 5) {
      basePrice *= 1.1; // 10% increase for registration cards more than 5 years old
    }
  
    // Return three price suggestions: base price, base price + 10%, base price + 20%
    return [basePrice, basePrice * 1.1, basePrice * 1.2];
  }
  
}
