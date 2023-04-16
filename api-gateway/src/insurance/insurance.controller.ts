import { Controller, Get, Post, Put, Delete, Param, Body, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('insurance')
export class InsuranceController {
  
    constructor(@Inject('INSURANCE_SERVICE') private insuranceServiceClient: ClientProxy) {}
  
    @Post()
    createInsurance(@Body() insuranceDto: any): Observable<any> {
      return this.insuranceServiceClient.send({ cmd: 'createInsurance' }, insuranceDto);
    }
  
    @Get()
    getInsurances(): Observable<any> {
      return this.insuranceServiceClient.send({ cmd: 'getInsurances' }, '');
    }
  
    @Get(':id')
    getInsuranceById(@Param('id') id: string): Observable<any> {
      return this.insuranceServiceClient.send({ cmd: 'getInsuranceById' }, id);
    }
  
    @Put(':id')
    updateInsurance(@Param('id') id: string, @Body() insuranceDto: any): Observable<any> {
      return this.insuranceServiceClient.send({ cmd: 'updateInsurance' }, { id, ...insuranceDto });
    }
  
    @Delete(':id')
    deleteInsurance(@Param('id') id: string): Observable<any> {
      return this.insuranceServiceClient.send({ cmd: 'deleteInsurance' }, id);
    }
  
    @Get('beneficiary/:id/insurances')
    getBeneficiaryWithInsurances(@Param('id') id: string): Observable<any> {
      return this.insuranceServiceClient.send({ cmd: 'getBeneficiaryWithInsurances' }, id);
    }

  // Add other endpoints for CRUD operations here
}
