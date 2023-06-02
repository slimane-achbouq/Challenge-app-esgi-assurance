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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Insurance')
@Controller()
export class InsuranceController {
  constructor(
    @Inject('INSURANCE_SERVICE') private insuranceServiceClient: ClientProxy,
    @Inject('QUOTE_SERVICE') private readonly quoteServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private userServiceClient: ClientProxy,
  ) {}

  @Post('insurance')
  @UsePipes(ValidationPipe)
  createInsurance(@Body() insuranceDto: CreateInsuranceDto): Observable<any> {
    return this.insuranceServiceClient.send(
      { cmd: 'createInsurance' },
      insuranceDto,
    );
  }

  @Get('insurance')
  getInsurances(): Observable<any> {
    return this.insuranceServiceClient.send({ cmd: 'getInsurances' }, '');
  }

  @Get('insurance/:id')
  getInsuranceById(@Param('id') id: string): Observable<any> {
    return this.insuranceServiceClient.send({ cmd: 'getInsuranceById' }, id);
  }

  @Put('insurance/:id')
  @UsePipes(ValidationPipe)
  updateInsurance(
    @Param('id') id: string,
    @Body() insuranceDto: UpdateInsuranceDto,
  ): Observable<any> {
    return this.insuranceServiceClient.send(
      { cmd: 'updateInsurance' },
      { id, ...insuranceDto },
    );
  }

  @Delete('insurance/:id')
  deleteInsurance(@Param('id') id: string): Observable<any> {
    return this.insuranceServiceClient.send({ cmd: 'deleteInsurance' }, id);
  }

  @Get('beneficiary/:id/insurances')
  getBeneficiaryWithInsurances(@Param('id') id: string): Observable<any> {
    return this.insuranceServiceClient.send(
      { cmd: 'getBeneficiaryWithInsurances' },
      id,
    );
  }

  @Get('beneficiary/:id')
  getBeneficiaryById(@Param('id') id: string): Observable<any> {
    return this.insuranceServiceClient.send({ cmd: 'getBeneficiaryById' }, id);
  }

  @Get('beneficiaries')
  getBeneficiaries(): Observable<any> {
    return this.insuranceServiceClient.send({ cmd: 'getBeneficiaries' }, '');
  }

  @Post('beneficiary')
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'justificatifDomicile', maxCount: 1 },
      { name: 'permis', maxCount: 1 },
    ]),
  )
  async createBeneficiary(
    @Body() beneficiaryDto: CreateBeneficiaryDto,
    @UploadedFiles()
    files: {
      justificatifDomicile: Express.Multer.File[];
      permis: Express.Multer.File[];
    },
  ) {
    const fileContents = {
      justificatifDomicile: files.justificatifDomicile[0]
        ? files.justificatifDomicile[0].buffer.toString('base64')
        : null,
      permis: files.permis[0]
        ? files.permis[0].buffer.toString('base64')
        : null,
    };
    return this.insuranceServiceClient
      .send({ cmd: 'createBeneficiary' }, { beneficiaryDto, fileContents })
      .toPromise();
  }

  @Put('beneficiary/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'justificatifDomicile', maxCount: 1 },
      { name: 'permis', maxCount: 1 },
    ]),
  )
  async updateBeneficiary(
    @Param('id') id: string,
    @Body() beneficiaryDto: UpdateBeneficiaryDto,
    @UploadedFiles()
    files: {
      justificatifDomicile: Express.Multer.File[];
      permis: Express.Multer.File[];
    },
  ) {
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
    return this.insuranceServiceClient
      .send({ cmd: 'updateBeneficiary' }, { id, beneficiaryDto, fileContents })
      .toPromise();
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
  async createBeneficiaryInsurance(
    @Req() req,
    @Body() createModifiedInsuranceDto: CreateModifiedInsuranceDto,
    @UploadedFiles()
    files: {
      justificatifDomicile: Express.Multer.File[];
      permis: Express.Multer.File[];
    },
  ) {
    const userData = await this.userServiceClient
      .send({ cmd: 'findUserById' }, req.user.sub)
      .toPromise();

    let currentbeneficiary = await this.insuranceServiceClient
      .send({ cmd: 'getBeneficiaryByUserId' }, req.user.sub)
      .toPromise();

    const fileContents = {
      justificatifDomicile: files.justificatifDomicile[0]
        ? files.justificatifDomicile[0].buffer.toString('base64')
        : null,
      permis: files.permis[0]
        ? files.permis[0].buffer.toString('base64')
        : null,
    };

    if (!currentbeneficiary) {
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

      currentbeneficiary = beneficiary;
    }

    const relateduote = await this.quoteServiceClient
      .send({ cmd: 'getQuoteById' }, createModifiedInsuranceDto.quoteId)
      .toPromise();

    const insuranceDto: CreateInsuranceDto = {
      insuranceType: relateduote.insuranceType,
      coverageStartDate: createModifiedInsuranceDto.coverageStartDate,
      coverageEndDate: createModifiedInsuranceDto.coverageEndDate,
      insurancePremium: relateduote.insurancePremium,
      insuranceStatus: 'active',
      quoteId: relateduote.id,
      dossierNumber: relateduote.quoteNumber,
      vehicleId: relateduote.vehicle.id,
      beneficiary: currentbeneficiary['_id'],
    };

    return this.insuranceServiceClient
      .send({ cmd: 'createInsurance' }, insuranceDto)
      .toPromise();
  }
}
