import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
  import { Client, ClientProxy, Transport } from '@nestjs/microservices';
  import { Inject } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { diskStorage } from 'multer';


  
  @Controller()
  export class QuoteController {
    constructor(
      @Inject('QUOTE_SERVICE') private readonly quoteServiceClient: ClientProxy,
    ) {}
  
    // Quote related endpoints
    @Post('quotes')
    async createQuote(@Body() quoteDto: any) {
      return this.quoteServiceClient.send({ cmd: 'createQuote' }, quoteDto).toPromise();
    }
  
    @Get('quotes')
    async getQuotes() {
      return this.quoteServiceClient.send({ cmd: 'getQuotes' }, {}).toPromise();
    }
  
    @Get('quotes/:id')
    async getQuoteById(@Param('id') id: string) {
      return this.quoteServiceClient.send({ cmd: 'getQuoteById' }, id).toPromise();
    }
  
    @Put('quotes/:id')
    async updateQuote(@Param('id') id: string, @Body() quoteDto: any) {
      return this.quoteServiceClient.send({ cmd: 'updateQuote' }, { id, quoteDto }).toPromise();
    }
  
    @Delete('quotes/:id')
    async deleteQuote(@Param('id') id: string) {
      return this.quoteServiceClient.send({ cmd: 'deleteQuote' }, id).toPromise();
    }
  
    // Vehicle related endpoints
    @Post('vehicles')
    @UseInterceptors(FileInterceptor('carteGrise'))
    async createVehicle(@Body() vehicleDto: any, @UploadedFile() file: Express.Multer.File) {
      const fileContent = file ? file.buffer.toString('base64') : null;
      if (!fileContent) {
        throw new Error('File not uploaded');
      }
      return this.quoteServiceClient
        .send({ cmd: 'createVehicle' }, { ...vehicleDto, carteGrise: fileContent })
        .toPromise();
    }
  
    @Get('vehicles')
    async getVehicles() {
      return this.quoteServiceClient.send({ cmd: 'getVehicles' }, {}).toPromise();
    }
  
    @Get('vehicles/:id')
    async getVehicleById(@Param('id') id: string) {
      return this.quoteServiceClient.send({ cmd: 'getVehicleById' }, id).toPromise();
    }
  
    @Put('vehicles/:id')
    @UseInterceptors(FileInterceptor('carteGrise'))
    async updateVehicle(
      @Param('id') id: string,
      @Body() vehicleDto: any,
      @UploadedFile() file: Express.Multer.File,
    ) {
      const fileContent = file ? file.buffer.toString('base64') : null;
      const updatedVehicleDto = fileContent ? { ...vehicleDto, carteGrise: fileContent } : vehicleDto;

      return this.quoteServiceClient
        .send({ cmd: 'updateVehicle' }, { id, vehicleDto: updatedVehicleDto })
        .toPromise();
    }

  
    @Delete('vehicles/:id')
    async deleteVehicle(@Param('id') id: string) {
      return this.quoteServiceClient.send({ cmd: 'deleteVehicle' }, id).toPromise();
    }
  }

  @Get('quotes')
  async getQuotes() {
    return this.quoteServiceClient.send({ cmd: 'getQuotes' }, {}).toPromise();
  }

  @Get('quotes/:id')
  async getQuoteById(@Param('id') id: string) {
    return this.quoteServiceClient
      .send({ cmd: 'getQuoteById' }, id)
      .toPromise();
  }

  @Put('quotes/:id')
  async updateQuote(@Param('id') id: string, @Body() quoteDto: any) {
    return this.quoteServiceClient
      .send({ cmd: 'updateQuote' }, { id, quoteDto })
      .toPromise();
  }

  @Delete('quotes/:id')
  async deleteQuote(@Param('id') id: string) {
    return this.quoteServiceClient.send({ cmd: 'deleteQuote' }, id).toPromise();
  }

  // Vehicle related endpoints
  @Post('vehicles')
  async createVehicle(@Body() vehicleDto: any) {
    return this.quoteServiceClient
      .send({ cmd: 'createVehicle' }, vehicleDto)
      .toPromise();
  }

  @Get('vehicles')
  async getVehicles() {
    return this.quoteServiceClient.send({ cmd: 'getVehicles' }, {}).toPromise();
  }

  @Get('vehicles/:id')
  async getVehicleById(@Param('id') id: string) {
    return this.quoteServiceClient
      .send({ cmd: 'getVehicleById' }, id)
      .toPromise();
  }

  @Put('vehicles/:id')
  async updateVehicle(@Param('id') id: string, @Body() vehicleDto: any) {
    return this.quoteServiceClient
      .send({ cmd: 'updateVehicle' }, { id, vehicleDto })
      .toPromise();
  }

  @Delete('vehicles/:id')
  async deleteVehicle(@Param('id') id: string) {
    return this.quoteServiceClient
      .send({ cmd: 'deleteVehicle' }, id)
      .toPromise();
  }
}
