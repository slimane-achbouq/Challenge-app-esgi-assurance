import { Controller,Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BeneficiaryService } from './beneficiary.service';
import { CreateBeneficiaryDto,UpdateBeneficiaryDto } from './beneficiary.dto';

@Controller('beneficiary')
export class BeneficiaryController {
  constructor(private readonly beneficiaryService: BeneficiaryService) {}

  @Post()
  createBeneficiary(@Body() beneficiaryDto: CreateBeneficiaryDto) {
    return this.beneficiaryService.createBeneficiary(beneficiaryDto);
  }

  @Get()
  getBeneficiaries(){
    console.log("ok")
    return this.beneficiaryService.getBeneficiaries();
  }

  @Get(':id')
  getBeneficiaryById(@Param('id') id: string) {
    console.log("okk")
    return this.beneficiaryService.getBeneficiaryById(id);
  }

  @Put(':id')
  updateBeneficiary(@Param('id') id: string, @Body() beneficiaryDto: UpdateBeneficiaryDto) {
    return this.beneficiaryService.updateBeneficiary(id, beneficiaryDto);
  }

  @Delete(':id')
  deleteBeneficiary(@Param('id') id: string) {
    return this.beneficiaryService.deleteBeneficiary(id);
}

@Get(':id/insurances')
getBeneficiaryWithInsurances(@Param('id') id: string) {
return this.beneficiaryService.getBeneficiaryWithInsurances(id);
}

  // Add other endpoints for CRUD operations here
}