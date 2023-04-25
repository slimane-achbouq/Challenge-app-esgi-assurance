import { Controller,Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BeneficiaryService } from './beneficiary.service';
import { CreateBeneficiaryDto,UpdateBeneficiaryDto } from './beneficiary.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('beneficiary')
export class BeneficiaryController {
  constructor(private readonly beneficiaryService: BeneficiaryService) {}

  @MessagePattern({ cmd: 'createBeneficiary' })
  async createBeneficiary(@Payload() data: any) {
    const { beneficiaryDto, fileContents } = data;
    return await this.beneficiaryService.createBeneficiary(beneficiaryDto, fileContents);
  }

  @MessagePattern({ cmd: 'getBeneficiaries' })
  async getBeneficiaries() {
    return await this.beneficiaryService.getBeneficiaries();
  }

  @MessagePattern({ cmd: 'getBeneficiaryById' })
  async getBeneficiaryById(@Payload() id: string) {
    return await this.beneficiaryService.getBeneficiaryById(id);
  }

  @MessagePattern({ cmd: 'updateBeneficiary' })
  async updateBeneficiary(@Payload() data: any) {
    const { id, beneficiaryDto, fileContents } = data;
    return await this.beneficiaryService.updateBeneficiary(id, beneficiaryDto, fileContents);
  }

  @MessagePattern({ cmd: 'deleteBeneficiary' })
  async deleteBeneficiary(@Payload() id: string) {
    return await this.beneficiaryService.deleteBeneficiary(id);
  }

  @MessagePattern({ cmd: 'getBeneficiaryWithInsurances' })
  async getBeneficiaryWithInsurances(@Payload() id: string) {
    return await this.beneficiaryService.getBeneficiaryWithInsurances(id);
  }

  // Add other endpoints for CRUD operations here
}