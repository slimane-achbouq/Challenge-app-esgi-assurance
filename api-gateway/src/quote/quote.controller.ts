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
  ValidationPipe,
  UsePipes,
  UseGuards,
  BadRequestException,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { diskStorage } from 'multer';
import { CreateQuoteDto, UpdateQuoteDto } from './dtos/quote.dto';
import { CreateVehicleDto, UpdateVehicleDto } from './dtos/vehicle.dto';
import { CreateVehicleQuoteDto } from './dtos/vehicle-quote.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { validate } from 'uuid';

@ApiTags('Quote')
@Controller()
export class QuoteController {
  constructor(
    @Inject('QUOTE_SERVICE') private readonly quoteServiceClient: ClientProxy,
  ) {}

  // Quote related endpoints
  @Post('quotes')
  @UsePipes(ValidationPipe)
  async createQuote(@Body() quoteDto: CreateQuoteDto) {
    return this.quoteServiceClient
      .send({ cmd: 'createQuote' }, quoteDto)
      .toPromise();
  }

  @Get('quotes')
  async getQuotes() {
    return this.quoteServiceClient.send({ cmd: 'getQuotes' }, {}).toPromise();
  }

  @Get('quotes/:id')
  async getQuoteById(@Param('id') id: string) {
    // Verify if ID is a valid UUID
    if (!validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const quote = await this.quoteServiceClient
      .send({ cmd: 'getQuoteById' }, id)
      .toPromise();

    // If quote doesn't exist, throw exception
    if (!quote) {
      throw new NotFoundException('Quote not found');
    }

    return quote;
  }

@Put('quotes/:id')
@UsePipes(ValidationPipe)
async updateQuote(@Param('id') id: string, @Body() quoteDto: UpdateQuoteDto) {
  // check if quote exists
  const existingQuote = await this.quoteServiceClient
    .send({ cmd: 'getQuoteById' }, id)
    .toPromise();

  if (!existingQuote) {
    throw new NotFoundException(`Quote not found`);
  }

  // proceed with update
  return this.quoteServiceClient
    .send({ cmd: 'updateQuote' }, { id, quoteDto })
    .toPromise();
}


@Delete('quotes/:id')
async deleteQuote(@Param('id') id: string) {
  // Check if quote exists
  const existingQuote = await this.quoteServiceClient
    .send({ cmd: 'getQuoteById' }, id)
    .toPromise();

  if (!existingQuote) {
    throw new NotFoundException(`Quote not found`);
  }

  // Proceed with deletion
  return this.quoteServiceClient
    .send({ cmd: 'deleteQuote' }, id)
    .toPromise();
}


  // Vehicle related endpoints
  @Post('vehicles')
  @UseInterceptors(FileInterceptor('carteGrise'))
  @UsePipes(ValidationPipe)
  async createVehicle(
    @Body() vehicleDto: CreateVehicleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileContent = file ? file.buffer.toString('base64') : null;
    if (!fileContent) {
      throw new Error('File not uploaded');
    }
    return this.quoteServiceClient
      .send(
        { cmd: 'createVehicle' },
        { ...vehicleDto, carteGrise: fileContent },
      )
      .toPromise();
  }

  @Get('vehicles')
  async getVehicles() {
    return this.quoteServiceClient.send({ cmd: 'getVehicles' }, {}).toPromise();
  }

  @Get('vehicles/:id')
  async getVehicleById(@Param('id') id: string) {
    const vehicle = await this.quoteServiceClient
      .send({ cmd: 'getVehicleById' }, id)
      .toPromise();
  
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID "${id}" not found`);
    }
  
    return vehicle;
  }
  

@Put('vehicles/:id')
@UseInterceptors(FileInterceptor('carteGrise'))
@UsePipes(ValidationPipe)
async updateVehicle(
  @Param('id') id: string,
  @Body() vehicleDto: UpdateVehicleDto,
  @UploadedFile() file: Express.Multer.File,
) {
  const fileContent = file ? file.buffer.toString('base64') : null;
  const updatedVehicleDto = fileContent
    ? { ...vehicleDto, carteGrise: fileContent }
    : vehicleDto;

  const updatedVehicle = await this.quoteServiceClient
    .send({ cmd: 'updateVehicle' }, { id, vehicleDto: updatedVehicleDto })
    .toPromise();

  if (!updatedVehicle) {
    throw new NotFoundException(`Vehicle with ID "${id}" not found or could not be updated`);
  }

  return updatedVehicle;
}


@Delete('vehicles/:id')
async deleteVehicle(@Param('id') id: string) {
  const deleted = await this.quoteServiceClient
    .send({ cmd: 'deleteVehicle' }, id)
    .toPromise();

  if (!deleted) {
    throw new NotFoundException(`Vehicle with ID "${id}" not found or could not be deleted`);
  }

  return { message: `Vehicle with ID "${id}" has been deleted successfully` };
}

@Get('prices/:id')
async getPrices(@Param('id') id: string) {
  const prices = await this.quoteServiceClient
    .send({ cmd: 'getPrices' }, id)
    .toPromise();

  if (!prices) {
    throw new NotFoundException(`Vehicle with ID "${id}" not found or could not be deleted`);
  }

  return prices;
}




  @Post('vehicles-with-quotes')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('carteGrise'))
  @UsePipes(ValidationPipe)
  async createVehicleWithQuote(
    @Req() req,
    @Body() createVehicleQuoteDto: CreateVehicleQuoteDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
  const fileContent = file ? file.buffer.toString('base64') : null;
  if (!fileContent) {
    throw new BadRequestException('File not uploaded');
  }

  const vehicleQuoteDto: CreateVehicleDto = { ...createVehicleQuoteDto };

  // Create vehicle first
  const createdVehicle = await this.quoteServiceClient
    .send(
      { cmd: 'createVehicle' },
      { ...vehicleQuoteDto, carteGrise: fileContent },
    )
    .toPromise();

  if (!createdVehicle) {
    throw new BadRequestException('Vehicle creation failed');
  }

  // Create quote with the created vehicle's ID
  const quoteDtoWithVehicleId = {
    ...createVehicleQuoteDto,
    insurancePremium: 33,
    coverageDuration: 22,
    userId: req.user.sub,
    vehicleId: createdVehicle.id,
  };
  const createdQuote = await this.quoteServiceClient
    .send({ cmd: 'createQuote' }, quoteDtoWithVehicleId)
    .toPromise();

  if (!createdQuote) {
    throw new BadRequestException('Quote creation failed');
  }

  // Return both the created vehicle and quote
  return {
    vehicle: createdVehicle,
    quote: createdQuote,
  };
}

}
