import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './quote.entity';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
  ) {}

  async createQuote(quoteDto: any): Promise<Quote> {
    const newQuote = this.quoteRepository.save(quoteDto);
    return newQuote;
  }

  async getQuotes(): Promise<Quote[]> {
    return this.quoteRepository.find();
  }

  async getQuoteById(id: string): Promise<Quote> {
    return this.quoteRepository.findOneBy({ id });
  }

  async updateQuote(id: string, quoteDto: any): Promise<Quote> {
    await this.quoteRepository.update(id, quoteDto);
    return this.quoteRepository.findOneBy({ id });
  }

  async deleteQuote(id: number): Promise<void> {
    await this.quoteRepository.delete(id);
  }
}
