import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBeneficiaryDto,UpdateBeneficiaryDto } from './beneficiary.dto'
import { Beneficiary } from './beneficiary.schema';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BeneficiaryService {
  constructor(
    @InjectModel(Beneficiary.name) private beneficiaryModel: Model<Beneficiary>,
  ) {}


  async createBeneficiary(
    beneficiaryDto: CreateBeneficiaryDto,
    fileContents: { justificatifDomicile: string; permis: string },
  ): Promise<Beneficiary> {
    const { justificatifDomicile, permis } = fileContents;
  
    // Decode the base64 file content
    const justificatifDomicileContent = justificatifDomicile
      ? Buffer.from(justificatifDomicile, 'base64')
      : null;
  
    const permisContent = permis ? Buffer.from(permis, 'base64') : null;
  
    const newBeneficiary = new this.beneficiaryModel({
      ...beneficiaryDto,
      justificatifDomicile: justificatifDomicileContent,
      permis: permisContent,
    });
  
    return newBeneficiary.save();
  }
  

  async getBeneficiaries(): Promise<Beneficiary[]> {
    return this.beneficiaryModel.find().exec();
  }

  async getBeneficiaryById(id: string): Promise<Beneficiary> {
    return this.beneficiaryModel.findById(id).exec();
  }

  async updateBeneficiary(
    id: string,
    beneficiaryDto: UpdateBeneficiaryDto,
    fileContents: { justificatifDomicile: string; permis: string },
  ): Promise<Beneficiary> {
    const { justificatifDomicile, permis } = fileContents;
  
    // If a new file is uploaded, decode it and save it as a blob
    const updatedJustificatifDomicile = justificatifDomicile
      ? Buffer.from(justificatifDomicile, 'base64')
      : null;
  
    const updatedPermis = permis ? Buffer.from(permis, 'base64') : null;
  
    const updatedBeneficiaryDto = {
      ...beneficiaryDto,
      justificatifDomicile: updatedJustificatifDomicile,
      permis: updatedPermis,
    };
  
    return this.beneficiaryModel
      .findByIdAndUpdate(id, updatedBeneficiaryDto, { new: true })
      .exec();
  }
  
  

  async deleteBeneficiary(id: string): Promise<Beneficiary> {
    return this.beneficiaryModel.findByIdAndDelete(id).exec();
  }

  async getBeneficiaryWithInsurances(id: string): Promise<Beneficiary> {
    return this.beneficiaryModel.findById(id).populate('insurances').exec();
  }

  async getBeneficiaryByUserId(userId: string): Promise<Beneficiary> {
    return this.beneficiaryModel.findOne({ userId }).exec();
  }
  

}
