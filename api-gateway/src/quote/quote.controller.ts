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
    return this.quoteServiceClient
      .send({ cmd: 'getQuoteById' }, id)
      .toPromise();
  }

  @Put('quotes/:id')
  @UsePipes(ValidationPipe)
  async updateQuote(@Param('id') id: string, @Body() quoteDto: UpdateQuoteDto) {
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
    return this.quoteServiceClient
      .send({ cmd: 'getVehicleById' }, id)
      .toPromise();
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

    return this.quoteServiceClient
      .send({ cmd: 'updateVehicle' }, { id, vehicleDto: updatedVehicleDto })
      .toPromise();
  }

  @Delete('vehicles/:id')
  async deleteVehicle(@Param('id') id: string) {
    return this.quoteServiceClient
      .send({ cmd: 'deleteVehicle' }, id)
      .toPromise();
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
      throw new Error('File not uploaded');
    }

    const vehicleQuoteDto: CreateVehicleDto = {
      vehicleType: createVehicleQuoteDto.vehicleType,
      brand: createVehicleQuoteDto.brand,
      model: createVehicleQuoteDto.model,
      horsepower: createVehicleQuoteDto.horsepower,
      licensePlate: createVehicleQuoteDto.licensePlate,
      licenseObtainedDate: createVehicleQuoteDto.licenseObtainedDate,
      vehicleCirculationDate: createVehicleQuoteDto.vehicleCirculationDate,
      registrationCardDate: createVehicleQuoteDto.registrationCardDate,
      purchaseMode: createVehicleQuoteDto.purchaseMode,
      parkingPostalCode: createVehicleQuoteDto.parkingPostalCode,
      parkingType: createVehicleQuoteDto.parkingType,
      annualMileage: createVehicleQuoteDto.annualMileage,
      registrationCardHolder: createVehicleQuoteDto.registrationCardHolder,
    };

    // Create vehicle first
    const createdVehicle = await this.quoteServiceClient
      .send(
        { cmd: 'createVehicle' },
        { ...vehicleQuoteDto, carteGrise: fileContent },
      )
      .toPromise();

    // Create quote with the created vehicle's ID
    const quoteDtoWithVehicleId = {
      insuranceType: createVehicleQuoteDto.insuranceType,
      coverage: createVehicleQuoteDto.coverage,
      insurancePremium: 33,
      coverageDuration: 22,
      userId: req.user.sub,
      vehicleId: createdVehicle.id,
    };
    const createdQuote = await this.quoteServiceClient
      .send({ cmd: 'createQuote' }, quoteDtoWithVehicleId)
      .toPromise();

    // Return both the created vehicle and quote
    return {
      vehicle: createdVehicle,
      quote: createdQuote,
    };
  }
}
