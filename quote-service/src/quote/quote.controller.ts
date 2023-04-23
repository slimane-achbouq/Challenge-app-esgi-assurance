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
  import { QuoteService } from './quote.service';
  import { Quote } from './quote.entity';
  import { MessagePattern, Payload } from '@nestjs/microservices';
  
  @Controller('quote')
  export class QuoteController {
    constructor(private readonly quoteService: QuoteService) {}
  
    @MessagePattern({ cmd: 'createQuote' })
    async createQuote(@Payload() quoteDto: any): Promise<Quote> {
      console.log(quoteDto)
      return await this.quoteService.createQuote(quoteDto);
    }
  
    @MessagePattern({ cmd: 'getQuotes' })
    async getQuotes(): Promise<Quote[]> {
      return await this.quoteService.getQuotes();
    }
  
    @MessagePattern({ cmd: 'getQuoteById' })
    async getQuoteById(@Payload() id: string): Promise<Quote> {
      return await this.quoteService.getQuoteById(id);
    }
  
    @MessagePattern({ cmd: 'updateQuote' })
    async updateQuote(@Payload() data: any): Promise<Quote> {
      const { id, quoteDto } = data;
      return await this.quoteService.updateQuote(id, quoteDto);
    }
  
    @MessagePattern({ cmd: 'deleteQuote' })
    async deleteQuote(@Payload() id: number): Promise<void> {
      return await this.quoteService.deleteQuote(id);
    }
  }
  