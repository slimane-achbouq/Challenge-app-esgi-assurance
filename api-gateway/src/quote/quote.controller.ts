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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { validate } from 'uuid';
import { QuoteLocalStorage } from './dtos/quote-localStorage.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ProfileValidationGuard } from 'src/common/guards/profile-validation.guard';
import { Roles } from 'src/common/guards/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@ApiTags('Quote')
@Controller({
  version: '1',
})
@SkipThrottle()
export class QuoteController {
  constructor(
    @Inject('QUOTE_SERVICE') private readonly quoteServiceClient: ClientProxy,
  ) {}

  // Quote related endpoints
  @Post('quotes')
  @UsePipes(ValidationPipe)
  @Throttle(5, 60)
  async createQuote(@Body() quoteDto: CreateQuoteDto) {
    if (quoteDto.insurancePremium) quoteDto.insurancePremium = 0;

    return this.quoteServiceClient
      .send({ cmd: 'createQuote' }, quoteDto)
      .toPromise();
  }

  @Get('quotes')
  @UseGuards(JwtAuthGuard, RolesGuard, ProfileValidationGuard)
  @Roles(Role.ADMIN)
  @Throttle(5, 60)
  @ApiBearerAuth()
  async getQuotes() {
    return this.quoteServiceClient.send({ cmd: 'getQuotes' }, {}).toPromise();
  }

  @Get('quote/:userId')
  @UseGuards(JwtAuthGuard)
  @Throttle(5, 60)
  async getQuoteByUserId(@Param('userId') userId: string) {
    return this.quoteServiceClient
      .send({ cmd: 'getQuoteByUserId' }, { userId: userId })
      .toPromise();
  }

  @Get('quotes/:id')
  @UseGuards(JwtAuthGuard)
  @Throttle(5, 60)
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

  @Get('quote-user/:userId')
  @UseGuards(JwtAuthGuard)
  @Throttle(5, 60)
  async getQuoteByIdUser(@Param('userId') userId: string) {
    // Verify if ID is a valid UUID

    const quote = await this.quoteServiceClient
      .send({ cmd: 'getQuoteByUserId' }, { id: userId })
      .toPromise();

    // If quote doesn't exist, throw exception
    if (!quote) {
      throw new NotFoundException('Quote not found');
    }

    return quote;
  }

  @Put('quotes/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Throttle(5, 60)
  async updateQuote(@Param('id') id: string, @Body() quoteDto: UpdateQuoteDto) {
    // check if quote exists
    const existingQuote = await this.quoteServiceClient
      .send({ cmd: 'getQuoteById' }, id)
      .toPromise();

    if (!existingQuote) {
      throw new NotFoundException(`Quote not found`);
    }

    const insurancePremium = quoteDto['insurancePremium'];

    if (insurancePremium && insurancePremium != 0) {
      throw new NotFoundException(
        'you can"t edit quote, contract exist for this quote',
      );
    }

    // proceed with update
    return this.quoteServiceClient
      .send({ cmd: 'updateQuote' }, { id, quoteDto })
      .toPromise();
  }

  @Delete('quotes/:id')
  @UseGuards(JwtAuthGuard)
  @Throttle(5, 60)
  async deleteQuote(@Param('id') id: string) {
    // Check if quote exists
    const existingQuote = await this.quoteServiceClient
      .send({ cmd: 'getQuoteById' }, id)
      .toPromise();

    if (!existingQuote) {
      throw new NotFoundException(`Quote not found`);
    }

    // Proceed with deletion
    return this.quoteServiceClient.send({ cmd: 'deleteQuote' }, id).toPromise();
  }

  // Vehicle related endpoints
  @Post('vehicles')
  @UseInterceptors(FileInterceptor('carteGrise'))
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard, RolesGuard, ProfileValidationGuard)
  @Roles(Role.ADMIN)
  @Throttle(5, 60)
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
  @UseGuards(JwtAuthGuard, RolesGuard, ProfileValidationGuard)
  @Roles(Role.ADMIN)
  async getVehicles() {
    return this.quoteServiceClient.send({ cmd: 'getVehicles' }, {}).toPromise();
  }

  @Get('vehicles/:id')
  @UseGuards(JwtAuthGuard)
  @Throttle(5, 60)
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
  @Throttle(5, 60)
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
      throw new NotFoundException(
        `Vehicle with ID "${id}" not found or could not be updated`,
      );
    }

    return updatedVehicle;
  }

  @Delete('vehicles/:id')
  @UseGuards(JwtAuthGuard)
  @Throttle(5, 60)
  async deleteVehicle(@Param('id') id: string) {
    const deleted = await this.quoteServiceClient
      .send({ cmd: 'deleteVehicle' }, id)
      .toPromise();

    if (!deleted) {
      throw new NotFoundException(
        `Vehicle with ID "${id}" not found or could not be deleted`,
      );
    }

    return { message: `Vehicle with ID "${id}" has been deleted successfully` };
  }

  @Get('prices/:id')
  @Throttle(5, 60)
  async getPrices(@Param('id') id: string) {
    const prices = await this.quoteServiceClient
      .send({ cmd: 'getPrices' }, id)
      .toPromise();

    if (!prices) {
      throw new NotFoundException(
        `Vehicle with ID "${id}" not found or could not be deleted`,
      );
    }

    return prices;
  }

  @Post('vehicles-with-quotes')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('carteGrise'))
  @UsePipes(ValidationPipe)
  @Throttle(5, 60)
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
      insurancePremium: 0,
      coverageDuration: createVehicleQuoteDto.coverageDuration,
      userId: req.user.id,
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

  @Post('vehicles-with-quotes-nc')
  @UsePipes(ValidationPipe)
  @Throttle(5, 60)
  async createVehicleWithQuoteNC(
    @Body() createVehicleQuoteDto: CreateVehicleQuoteDto,
  ) {
    return this.calculateInsurancePremiums(createVehicleQuoteDto);
  }

  async calculateInsurancePremiums(
    createVehicleQuoteDto: CreateVehicleQuoteDto,
  ): Promise<number[]> {
    let { horsepower, vehicleCirculationDate, registrationCardDate } =
      createVehicleQuoteDto;

    // Calculate the age of the vehicle
    vehicleCirculationDate = new Date(vehicleCirculationDate);
    const vehicleAge =
      new Date().getFullYear() - vehicleCirculationDate.getFullYear();

    // Calculate the years since the registration card date
    registrationCardDate = new Date(registrationCardDate);
    const registrationCardAge =
      new Date().getFullYear() - registrationCardDate.getFullYear();

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

    // Return three price suggestions: base price, base price + 10%, base price + 20%
    return [basePrice, basePrice * 1.1, basePrice * 1.2];
  }

  @Post('vehicles-with-quote-local-storage')
  @UseGuards(JwtAuthGuard)
  @Throttle(5, 60)
  async createVehicleWithQuoteFromLocalStorage(
    @Req() req,
    @Body() createVehicleQuoteDto: QuoteLocalStorage,
  ) {
    const fileContent = createVehicleQuoteDto.carteGrise;

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
      insurancePremium: 0,
      coverageDuration: createVehicleQuoteDto.coverageDuration,
      userId: req.user.id,
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
