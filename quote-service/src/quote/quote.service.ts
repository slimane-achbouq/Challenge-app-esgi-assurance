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

  async getQuoteByIdUser(id: string): Promise<Quote> {
    return this.quoteRepository
      .createQueryBuilder('quote')
      .leftJoinAndSelect('quote.vehicle', 'vehicle')
      .where('quote.id = :id', { id })
      .select([
        'quote.id',
        'quote.insuranceType',
        'quote.coverage',
        'quote.insurancePremium',
        'quote.coverageDuration',
        'quote.createdAt',
        'quote.updatedAt',
        'quote.coverageStartDate',
        'vehicle.id',
        'vehicle.vehicleType',
        'vehicle.brand',
        'vehicle.model',
        'vehicle.horsepower',
        'vehicle.licensePlate',
        'vehicle.licenseObtainedDate',
        'vehicle.vehicleCirculationDate',
        'vehicle.registrationCardDate',
        'vehicle.registrationCardHolder',
        'vehicle.purchaseMode',
        'vehicle.parkingPostalCode',
        'vehicle.annualMileage'
      ])
      .getOne();
  }

  async getQuotesByUserId(userId: string): Promise<Quote[]> {
    return this.quoteRepository.find({
      where: { userId: userId },
      select: [
        'id',
        'insuranceType',
        'coverage',
        'insurancePremium',
        'coverageDuration',
        'createdAt',
        'updatedAt',
        'coverageStartDate',
      ],
      relations: ['vehicle'],
    });
  }
  
  

  async updateQuote(id: string, quoteDto: UpdateQuoteDto): Promise<Quote> {
    const fieldName = 'id';
    await this.quoteRepository.update({ [fieldName]: id }, quoteDto);
    return this.quoteRepository.findOneBy({ id: id });
  }

  async deleteQuote(id: string): Promise<void> {
    const quote = await this.quoteRepository.findOneBy({ id: id });
    if (quote) {
      await this.quoteRepository.delete({ id: quote.id, quoteNumber: quote.quoteNumber });
    }
  }

}
