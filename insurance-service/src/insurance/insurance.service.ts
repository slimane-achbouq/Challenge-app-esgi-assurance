import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Insurance } from './insurance.schema';
import { Beneficiary } from '../beneficiary/beneficiary.schema';

@Injectable()
export class InsuranceService {
  constructor(
    @InjectModel(Insurance.name) private insuranceModel: Model<Insurance>,
    @InjectModel(Beneficiary.name) private beneficiaryModel: Model<Beneficiary>,
    
  ) {}

  async createInsurance(insuranceDto: any): Promise<Insurance> {
    const beneficiary = await this.beneficiaryModel.findById(insuranceDto.beneficiary).exec();
    if (!beneficiary) {
      throw new NotFoundException('Beneficiary not found');
    }
    const newInsurance = new this.insuranceModel({ ...insuranceDto, beneficiary: insuranceDto.beneficiary });
    const savedInsurance = await newInsurance.save();
    beneficiary.insurances.push(savedInsurance._id);
    await beneficiary.save();
    return savedInsurance;
  }

  async getInsurances(): Promise<Insurance[]> {
    console.log("ok")
    return this.insuranceModel.find().exec();
  }

  async getInsuranceById(id: string): Promise<Insurance> {
    return this.insuranceModel.findById(id).exec();
  }

  async updateInsurance(id: string, insuranceDto: any): Promise<Insurance> {
    return this.insuranceModel.findByIdAndUpdate(id, insuranceDto, { new: true }).exec();
  }

  async deleteInsurance(id: string): Promise<Insurance> {
    return this.insuranceModel.findByIdAndDelete(id).exec();
  }

}