import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('insurance')
export class InsuranceController {
  constructor(private insuranceService: InsuranceService) {}


  @Post()
  createInsurance(@Body() insuranceDto: any) {
    return this.insuranceService.createInsurance(insuranceDto);
  }

  

  @MessagePattern({  cmd: 'hello' })
  async getInsurances(@Payload() id: string) {
    console.log(id)
    return this.insuranceService.getInsurances();
  } 

  @Get(':id')
  getInsuranceById(@Param('id') id: string) {
    return this.insuranceService.getInsuranceById(id);
  }
  
  @Put(':id')
  updateInsurance(@Param('id') id: string, @Body() insuranceDto: any) {
    return this.insuranceService.updateInsurance(id, insuranceDto);
  }

  @Delete(':id')
  deleteInsurance(@Param('id') id: string) {
    return this.insuranceService.deleteInsurance(id);
  }


}