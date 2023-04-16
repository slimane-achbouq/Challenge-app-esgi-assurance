import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('insurance')
export class InsuranceController {
  constructor(private insuranceService: InsuranceService) {}


  @MessagePattern({ cmd: 'create_insurance' })
  async createInsurance(@Payload() insuranceDto: any) {
    return this.insuranceService.createInsurance(insuranceDto);
  } 

  @MessagePattern({ cmd: 'getInsurances' })
  async getInsurances() {
    return this.insuranceService.getInsurances();
  }

  @MessagePattern({ cmd: 'get_insurance_by_id' })
  async getInsuranceById(@Payload() id: string) {
    return this.insuranceService.getInsuranceById(id);
  }
  
  @MessagePattern({ cmd: 'update_insurance' })
  async updateInsurance(@Payload() data: { id: string; insuranceDto: any }) {
    return this.insuranceService.updateInsurance(data.id, data.insuranceDto);
  }

  @MessagePattern({ cmd: 'delete_insurance' })
  async deleteInsurance(@Payload() id: string) {
    return this.insuranceService.deleteInsurance(id);
  }


}