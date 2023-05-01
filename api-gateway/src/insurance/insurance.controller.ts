import { Controller, Get, Post, Put, Delete, Param, Body, Inject, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';

@Controller()
export class InsuranceController {
  
    constructor(@Inject('INSURANCE_SERVICE') private insuranceServiceClient: ClientProxy) {}
  
    @Post('insurance')
    createInsurance(@Body() insuranceDto: any): Observable<any> {
      return this.insuranceServiceClient.send({ cmd: 'createInsurance' }, insuranceDto);
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
    updateInsurance(@Param('id') id: string, @Body() insuranceDto: any): Observable<any> {
      return this.insuranceServiceClient.send({ cmd: 'updateInsurance' }, { id, ...insuranceDto });
    }
  
    @Delete('insurance/:id')
    deleteInsurance(@Param('id') id: string): Observable<any> {
      return this.insuranceServiceClient.send({ cmd: 'deleteInsurance' }, id);
    }
  
    @Get('beneficiary/:id/insurances')
    getBeneficiaryWithInsurances(@Param('id') id: string): Observable<any> {
      return this.insuranceServiceClient.send({ cmd: 'getBeneficiaryWithInsurances' }, id);
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
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'justificatifDomicile', maxCount: 1 },
    { name: 'permis', maxCount: 1 },
  ]))
  async createBeneficiary(
    @Body() beneficiaryDto: any,
    @UploadedFiles() files: { justificatifDomicile: Express.Multer.File[], permis: Express.Multer.File[]}
  ) {
    const fileContents = {
      justificatifDomicile: files.justificatifDomicile[0] ? files.justificatifDomicile[0].buffer.toString('base64') : null,
      permis: files.permis[0] ? files.permis[0].buffer.toString('base64') : null,
    };
    return this.insuranceServiceClient
      .send({ cmd: 'createBeneficiary' }, { beneficiaryDto, fileContents })
      .toPromise();
  }

  @Put('beneficiary/:id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'justificatifDomicile', maxCount: 1 },
    { name: 'permis', maxCount: 1 },
  ]))
  async updateBeneficiary(
    @Param('id') id: string,
    @Body() beneficiaryDto: any,
    @UploadedFiles() files: { justificatifDomicile: Express.Multer.File[], permis: Express.Multer.File[] }
  ) {
    const fileContents = {
      justificatifDomicile: files.justificatifDomicile && files.justificatifDomicile[0]
        ? files.justificatifDomicile[0].buffer.toString('base64')
        : null,
      permis: files.permis && files.permis[0] ? files.permis[0].buffer.toString('base64') : null,
    };
    return this.insuranceServiceClient
      .send({ cmd: 'updateBeneficiary' }, { id, beneficiaryDto, fileContents })
      .toPromise();
  }
  



  // Add other endpoints for CRUD operations here
}
