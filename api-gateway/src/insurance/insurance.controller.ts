import {
  Req,
  UseGuards,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Inject,
  UseInterceptors,
  UploadedFiles,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CreateBeneficiaryDto,
  UpdateBeneficiaryDto,
} from './dtos/beneficiary.dto';
import {
  CreateInsuranceDto,
  CreateModifiedInsuranceDto,
  UpdateInsuranceDto,
} from './dtos/insurance.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/guards/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ProfileValidationGuard } from 'src/common/guards/profile-validation.guard';

@ApiTags('Insurance')
@Controller({
  version: '1',
})
export class InsuranceController {
  constructor(
    @Inject('INSURANCE_SERVICE') private insuranceServiceClient: ClientProxy,
    @Inject('QUOTE_SERVICE') private readonly quoteServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private userServiceClient: ClientProxy,
  ) {}

  @Post('insurance')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async createInsurance(
    @Body() insuranceDto: CreateInsuranceDto,
  ): Promise<any> {
    try {
      const createdInsurance = await this.insuranceServiceClient
        .send({ cmd: 'createInsurance' }, insuranceDto)
        .toPromise();

      return createdInsurance;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get('insurance')
  @UseGuards(JwtAuthGuard, RolesGuard, ProfileValidationGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  async getInsurances(): Promise<any> {
    try {
      const insurances = await this.insuranceServiceClient
        .send({ cmd: 'getInsurances' }, '')
        .toPromise();

      return insurances;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get('getoneuser/:id')
  async getUserById(@Param('id') id: string): Promise<any> {
    try {
      const userData = await this.userServiceClient
        .send({ cmd: 'findUserById' }, id)
        .toPromise();

      if (!userData) throw new NotFoundException('User Not found');

      return userData;
    } catch (err) {
      throw new NotFoundException('User Not found');
    }
  }

  @Get('insurance/:id')
  @UseGuards(JwtAuthGuard)
  async getInsuranceById(@Param('id') id: string): Promise<any> {
    try {
      const insurance = await this.insuranceServiceClient
        .send({ cmd: 'getInsuranceById' }, id)
        .toPromise();

      if (!insurance) {
        throw new NotFoundException(`Insurance with ID "${id}" not found`);
      }

      return insurance;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException(err.message);
    }
  }

  @Get('insurance-user/:userId')
  @UseGuards(JwtAuthGuard)
  async getInsurancesByUserId(@Param('userId') userId: string): Promise<any> {
    try {
      const insurance = await this.insuranceServiceClient
        .send({ cmd: 'getInsurancesByUserId' }, userId)
        .toPromise();

      if (!insurance) {
        throw new NotFoundException(`Insurance with ID  not found`);
      }

      return insurance;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException(err.message);
    }
  }

  @Put('insurance/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async updateInsurance(
    @Param('id') id: string,
    @Body() insuranceDto: UpdateInsuranceDto,
  ): Promise<any> {
    try {
      const insurance = await this.insuranceServiceClient
        .send({ cmd: 'getInsuranceById' }, id)
        .toPromise();

      if (!insurance) {
        throw new NotFoundException(`Insurance with ID "${id}" not found`);
      }

      const updatedInsurance = await this.insuranceServiceClient
        .send({ cmd: 'updateInsurance' }, { id, ...insuranceDto })
        .toPromise();

      if (!updatedInsurance) {
        throw new NotFoundException(
          `Insurance with ID "${id}" could not be updated`,
        );
      }

      return updatedInsurance;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException(err.message);
    }
  }

  @Delete('insurance/:id')
  @UseGuards(JwtAuthGuard, RolesGuard, ProfileValidationGuard)
  @Roles(Role.ADMIN)
  async deleteInsurance(@Param('id') id: string): Promise<any> {
    try {
      const deletedInsurance = await this.insuranceServiceClient
        .send({ cmd: 'deleteInsurance' }, id)
        .toPromise();

      if (!deletedInsurance) {
        throw new NotFoundException(
          `Insurance with ID "${id}" not found or could not be deleted`,
        );
      }

      return deletedInsurance;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException(err.message);
    }
  }

  @Get('beneficiary/:id/insurances')
  @UseGuards(JwtAuthGuard)
  async getBeneficiaryWithInsurances(@Param('id') id: string): Promise<any> {
    try {
      const beneficiaryWithInsurances = await this.insuranceServiceClient
        .send({ cmd: 'getBeneficiaryWithInsurances' }, id)
        .toPromise();

      if (!beneficiaryWithInsurances) {
        throw new NotFoundException(`Beneficiary with ID "${id}" not found`);
      }

      return beneficiaryWithInsurances;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException(err.message);
    }
  }

  @Get('beneficiary/:id')
  @UseGuards(JwtAuthGuard)
  async getBeneficiaryById(@Param('id') id: string): Promise<any> {
    try {
      const beneficiary = await this.insuranceServiceClient
        .send({ cmd: 'getBeneficiaryById' }, id)
        .toPromise();

      if (!beneficiary) {
        throw new NotFoundException(`Beneficiary with ID "${id}" not found`);
      }

      return beneficiary;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException(err.message);
    }
  }

  @Get('beneficiaries')
  @UseGuards(JwtAuthGuard, RolesGuard, ProfileValidationGuard)
  @Roles(Role.ADMIN)
  async getBeneficiaries(): Promise<any> {
    try {
      const beneficiaries = await this.insuranceServiceClient
        .send({ cmd: 'getBeneficiaries' }, {})
        .toPromise();

      if (!beneficiaries) {
        throw new NotFoundException('No beneficiaries found');
      }

      return beneficiaries;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException(err.message);
    }
  }

  @Post('beneficiary')
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'justificatifDomicile', maxCount: 1 },
      { name: 'permis', maxCount: 1 },
    ]),
  )
  @UseGuards(JwtAuthGuard)
  async createBeneficiary(
    @Body() beneficiaryDto: CreateBeneficiaryDto,
    @UploadedFiles()
    files: {
      justificatifDomicile: Express.Multer.File[];
      permis: Express.Multer.File[];
    },
  ): Promise<any> {
    try {
      const fileContents = {
        justificatifDomicile: files.justificatifDomicile[0]
          ? files.justificatifDomicile[0].buffer.toString('base64')
          : null,
        permis: files.permis[0]
          ? files.permis[0].buffer.toString('base64')
          : null,
      };
      const beneficiary = await this.insuranceServiceClient
        .send({ cmd: 'createBeneficiary' }, { beneficiaryDto, fileContents })
        .toPromise();

      return beneficiary;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Put('beneficiary/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'justificatifDomicile', maxCount: 1 },
      { name: 'permis', maxCount: 1 },
    ]),
  )
  @UseGuards(JwtAuthGuard)
  async updateBeneficiary(
    @Param('id') id: string,
    @Body() beneficiaryDto: UpdateBeneficiaryDto,
    @UploadedFiles()
    files: {
      justificatifDomicile: Express.Multer.File[];
      permis: Express.Multer.File[];
    },
  ): Promise<any> {
    try {
      const beneficiary = await this.insuranceServiceClient
        .send({ cmd: 'getBeneficiaryById' }, id)
        .toPromise();

      if (!beneficiary) {
        throw new NotFoundException(`Beneficiary with ID "${id}" not found.`);
      }

      const fileContents = {
        justificatifDomicile:
          files.justificatifDomicile && files.justificatifDomicile[0]
            ? files.justificatifDomicile[0].buffer.toString('base64')
            : null,
        permis:
          files.permis && files.permis[0]
            ? files.permis[0].buffer.toString('base64')
            : null,
      };

      if (!fileContents.justificatifDomicile || !fileContents.permis) {
        throw new BadRequestException('File not uploaded');
      }

      const updatedBeneficiary = await this.insuranceServiceClient
        .send(
          { cmd: 'updateBeneficiary' },
          { id, beneficiaryDto, fileContents },
        )
        .toPromise();

      return updatedBeneficiary;
    } catch (err) {
      if (err.message.includes('Quote creation failed')) {
        throw new BadRequestException('Quote creation failed');
      }
      throw err;
    }
  }

  @Post('beneficiary-insurance')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'justificatifDomicile', maxCount: 1 },
      { name: 'permis', maxCount: 1 },
    ]),
  )
  @UseGuards(JwtAuthGuard)
  async createBeneficiaryInsurance(
    @Req() req,
    @Body() createModifiedInsuranceDto: CreateModifiedInsuranceDto,
    @UploadedFiles()
    files: {
      justificatifDomicile: Express.Multer.File[];
      permis: Express.Multer.File[];
    },
  ): Promise<any> {
    try {
      const userData = await this.userServiceClient
        .send({ cmd: 'findUserById' }, req.user.id)
        .toPromise();

      if (!userData) {
        throw new NotFoundException(`User with ID "${req.user.id}" not found.`);
      }

      let currentBeneficiary = await this.insuranceServiceClient
        .send({ cmd: 'getBeneficiaryByUserId' }, req.user.id)
        .toPromise();

      const fileContents = {
        justificatifDomicile: files.justificatifDomicile[0]
          ? files.justificatifDomicile[0].buffer.toString('base64')
          : null,
        permis: files.permis[0]
          ? files.permis[0].buffer.toString('base64')
          : null,
      };

      if (!fileContents.justificatifDomicile || !fileContents.permis) {
        throw new BadRequestException('Files not uploaded');
      }

      if (!currentBeneficiary) {
        const beneficiaryInsuranceDto: CreateBeneficiaryDto = {
          firstName: userData.firstname,
          lastName: userData.lastname,
          postalAddress:
            userData.adresse + ' ' + userData.codeCity + ' ' + userData.city,
          phoneNumber: userData.phoneNumber,
          email: userData.email,
          userId: userData['_id'],
        };

        const beneficiary = await this.insuranceServiceClient
          .send(
            { cmd: 'createBeneficiary' },
            { beneficiaryDto: beneficiaryInsuranceDto, fileContents },
          )
          .toPromise();

        currentBeneficiary = beneficiary;
      }

      const relatedQuote = await this.quoteServiceClient
        .send({ cmd: 'getQuoteById' }, createModifiedInsuranceDto.quoteId)
        .toPromise();

      if (!relatedQuote) {
        throw new NotFoundException(
          `Quote with ID "${createModifiedInsuranceDto.quoteId}" not found.`,
        );
      }

      const insuranceDto: CreateInsuranceDto = {
        insuranceType: relatedQuote.insuranceType,
        coverageStartDate: createModifiedInsuranceDto.coverageStartDate,
        coverageEndDate: createModifiedInsuranceDto.coverageEndDate,
        insurancePremium: createModifiedInsuranceDto.insurancePremium,
        quoteId: relatedQuote.id,
        dossierNumber: relatedQuote.quoteNumber,
        vehicleId: relatedQuote.vehicle.id,
        beneficiary: currentBeneficiary['_id'],
        status: false,
      };

      return this.insuranceServiceClient
        .send({ cmd: 'createInsurance' }, insuranceDto)
        .toPromise();
    } catch (err) {
      if (err.message.includes('Insurance creation failed')) {
        throw new BadRequestException('Insurance creation failed');
      }
    }
  }
}
