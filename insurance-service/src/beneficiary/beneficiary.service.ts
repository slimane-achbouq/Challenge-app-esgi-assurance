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

    // Save the files and get their paths
    const justificatifDomicilePath = justificatifDomicile
      ? this.saveFile(justificatifDomicile, 'justificatif-domicile')
      : null;

    const permisPath = permis ? this.saveFile(permis, 'permis') : null;

    const newBeneficiary = new this.beneficiaryModel({
      ...beneficiaryDto,
      justificatifDomicile: justificatifDomicilePath,
      permis: permisPath,
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
    const beneficiary = await this.beneficiaryModel.findById(id).exec();
  
    let updatedJustificatifDomicilePath: string | null = null;
    let updatedPermisPath: string | null = null;
  
    if (justificatifDomicile) {
      if (beneficiary.justificatifDomicile) {
        fs.unlinkSync(beneficiary.justificatifDomicile); // Delete the old file
      }
      updatedJustificatifDomicilePath = await this.saveFile(justificatifDomicile, 'justificatif-domicile');
    } else {
      updatedJustificatifDomicilePath = beneficiary.justificatifDomicile;
    }
  
    if (permis) {
      if (beneficiary.permis) {
        fs.unlinkSync(beneficiary.permis); // Delete the old file
      }
      updatedPermisPath = await this.saveFile(permis, 'permis');
    } else {
      updatedPermisPath = beneficiary.permis;
    }
  
    const updatedBeneficiaryDto = {
      ...beneficiaryDto,
      justificatifDomicile: updatedJustificatifDomicilePath,
      permis: updatedPermisPath,
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

  // Add other methods for CRUD operations here


  private saveFile(base64Content: string, prefix: string): string {
    const fileName = `${Date.now()}-${prefix}.pdf`;
    const filePath = path.join('./uploads', fileName);

    // Save the base64 encoded file
    fs.writeFileSync(filePath, Buffer.from(base64Content, 'base64'));

    return filePath;
  }
}
