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
    const vehicle = await this.vehicleService.getVehicleById(quoteDto.vehicleId);

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
    return this.quoteRepository.find();
  }

  async getQuoteById(id: string): Promise<Quote> {
    return this.quoteRepository.findOneBy({ id });
  }

  async updateQuote(id: string, quoteDto: UpdateQuoteDto): Promise<Quote> {

    const fieldName : string = "id"
    console.log(id)
    console.log(quoteDto)
    await this.quoteRepository.update( { [fieldName]: id }, quoteDto);
    return this.quoteRepository.findOneBy({ id: id });
  }

  async deleteQuote(id: number): Promise<void> {
    await this.quoteRepository.delete(id);
  }
}
