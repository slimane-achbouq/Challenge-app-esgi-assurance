import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { InsuranceService } from './insurance.service';

@Controller()
export class InsuranceController {
  constructor(private insuranceService: InsuranceService) {}

  // Insurance CRUD operations
  @Post('insurance')
  createInsurance(@Body() insuranceDto: any) {
    return this.insuranceService.createInsurance(insuranceDto);
  }

  @Get('insurance')
  getInsurances() {
    return this.insuranceService.getInsurances();
  }

  @Get('insurance/:id')
  getInsuranceById(@Param('id') id: string) {
    return this.insuranceService.getInsuranceById(id);
  }

  @Put('insurance/:id')
  updateInsurance(@Param('id') id: string, @Body() insuranceDto: any) {
    return this.insuranceService.updateInsurance(id, insuranceDto);
  }

  @Delete('insurance/:id')
  deleteInsurance(@Param('id') id: string) {
    return this.insuranceService.deleteInsurance(id);
  }

  // Beneficiary CRUD operations
  @Post('beneficiary')
  createBeneficiary(@Body() beneficiaryDto: any) {
    return this.insuranceService.createBeneficiary(beneficiaryDto);
  }

  @Get('beneficiary')
  getBeneficiaries(){
    console.log("ok")
    return this.insuranceService.getBeneficiaries();
  }

  @Get('beneficiary/:id')
  getBeneficiaryById(@Param('id') id: string) {
    console.log("okk")
    return this.insuranceService.getBeneficiaryById(id);
  }

  @Put('beneficiary/:id')
  updateBeneficiary(@Param('id') id: string, @Body() beneficiaryDto: any) {
    return this.insuranceService.updateBeneficiary(id, beneficiaryDto);
  }

  @Delete('beneficiary/:id')
  deleteBeneficiary(@Param('id') id: string) {
    return this.insuranceService.deleteBeneficiary(id);
}

@Get('beneficiary/:id/insurances')
getBeneficiaryWithInsurances(@Param('id') id: string) {
return this.insuranceService.getBeneficiaryWithInsurances(id);
}

}