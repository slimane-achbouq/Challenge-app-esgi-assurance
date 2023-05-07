import { Controller, Get, Post, Put, Delete, Param, Body, Inject } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateInsuranceDto,UpdateInsuranceDto } from './insurance.dto';

@Controller('insurance')
export class InsuranceController {
  constructor(private insuranceService: InsuranceService) {}


  @MessagePattern({ cmd: 'createInsurance' })
  async createInsurance(@Payload() insuranceDto: CreateInsuranceDto) {
    return this.insuranceService.createInsurance(insuranceDto);
  } 

  @MessagePattern({ cmd: 'getInsurances' })
  async getInsurances() {
    return this.insuranceService.getInsurances();
  }

  @MessagePattern({ cmd: 'getInsuranceById' })
  async getInsuranceById(@Payload() id: string) {
    return this.insuranceService.getInsuranceById(id);
  }
  
  @MessagePattern({ cmd: 'updateInsurance' })
  async updateInsurance(@Payload() data: {id:string ,insuranceDto:UpdateInsuranceDto}) {


    const { id } = data;
    const { id: _, ...insuranceDto } = data;

    // @ts-ignore
    return this.insuranceService.updateInsurance(id, insuranceDto);
  }

  @MessagePattern({ cmd: 'deleteInsurance' })
  async deleteInsurance(@Payload() id: string) {
    return this.insuranceService.deleteInsurance(id);
  }


}