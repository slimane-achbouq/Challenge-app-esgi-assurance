import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBeneficiaryDto,UpdateBeneficiaryDto } from './beneficiary.dto'
import { Beneficiary } from './beneficiary.schema';

@Injectable()
export class BeneficiaryService {
  constructor(
    @InjectModel(Beneficiary.name) private beneficiaryModel: Model<Beneficiary>,
  ) {}


  async createBeneficiary(beneficiaryDto: CreateBeneficiaryDto): Promise<Beneficiary> {
    const newBeneficiary = new this.beneficiaryModel(beneficiaryDto);
    return newBeneficiary.save();
  }

  async getBeneficiaries(): Promise<Beneficiary[]> {
    return this.beneficiaryModel.find().exec();
  }

  async getBeneficiaryById(id: string): Promise<Beneficiary> {
    return this.beneficiaryModel.findById(id).exec();
  }

  async updateBeneficiary(id: string, beneficiaryDto: UpdateBeneficiaryDto): Promise<Beneficiary> {
    return this.beneficiaryModel.findByIdAndUpdate(id, beneficiaryDto, { new: true }).exec();
  }

  async deleteBeneficiary(id: string): Promise<Beneficiary> {
    return this.beneficiaryModel.findByIdAndDelete(id).exec();
  }

  async getBeneficiaryWithInsurances(id: string): Promise<Beneficiary> {
    return this.beneficiaryModel.findById(id).populate('insurances').exec();
  }

  // Add other methods for CRUD operations here
}
