import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBeneficiaryDto,UpdateBeneficiaryDto } from './beneficiary.dto'
import { Beneficiary } from './beneficiary.schema';
import * as fs from 'fs';
import * as path from 'path';
import {WinstonModule} from "nest-winston";
import {format, transports} from "winston";

@Injectable()
export class BeneficiaryService {
  private logger = null;

  constructor(
    @InjectModel(Beneficiary.name) private beneficiaryModel: Model<Beneficiary>,
  ) {
    this.logger = WinstonModule.createLogger({
      transports: [
        new transports.File({
          level: 'debug',
          filename: 'logs/debug.log',
          format: format.combine(format.timestamp(), format.json()),
        }),
        new transports.File({
          level: 'error',
          filename: 'logs/error.log',
          format: format.combine(format.timestamp(), format.json()),
        }),
        new transports.Console({
          format: format.combine(
              format.colorize({message: true}),
          )
        }),
      ]
    });
  }


  async createBeneficiary(
    beneficiaryDto: CreateBeneficiaryDto,
    fileContents: { justificatifDomicile: string; permis: string,IdCard: string },
  ): Promise<Beneficiary> {
    const { justificatifDomicile, permis, IdCard } = fileContents;
  
    // Decode the base64 file content
    const justificatifDomicileContent = justificatifDomicile
      ? Buffer.from(justificatifDomicile, 'base64')
      : null;
  
    const permisContent = permis ? Buffer.from(permis, 'base64') : null;
    
    const IdCardContent = IdCard ? Buffer.from(IdCard, 'base64') : null;
  
    const newBeneficiary = new this.beneficiaryModel({
      ...beneficiaryDto,
      justificatifDomicile: justificatifDomicileContent,
      permis: permisContent,
      IdCard:IdCardContent,
    });

    this.logger.debug("debug", "createBeneficiary : new beneficiary " + beneficiaryDto.email + " created");
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
    fileContents: { justificatifDomicile: string; permis: string,IdCard: string ,veriviedImage:string  },
  ): Promise<Beneficiary> {
    const { justificatifDomicile, permis ,IdCard,veriviedImage } = fileContents;
  
    // If a new file is uploaded, decode it and save it as a blob
    const updatedJustificatifDomicile = justificatifDomicile
      ? Buffer.from(justificatifDomicile, 'base64')
      : null;
  
    const updatedPermis = permis ? Buffer.from(permis, 'base64') : null;

    const updatedIdCard = IdCard ? Buffer.from(IdCard, 'base64') : null;
  
    const updatedBeneficiaryDto = {
      ...beneficiaryDto,
      justificatifDomicile: updatedJustificatifDomicile,
      permis: updatedPermis,
      IdCard:updatedIdCard,
      veriviedImage:veriviedImage 
    };

    this.logger.debug("debug", "updateBeneficiary : beneficiary " + beneficiaryDto.email + " updated");
    return this.beneficiaryModel
      .findByIdAndUpdate(id, updatedBeneficiaryDto, { new: true })
      .exec();
  }
  
  

  async deleteBeneficiary(id: string): Promise<Beneficiary> {
    this.logger.debug("debug", "deleteBeneficiary : beneficiary ID " + id + " deleted");
    return this.beneficiaryModel.findByIdAndDelete(id).exec();
  }

  async getBeneficiaryWithInsurances(id: string): Promise<Beneficiary> {
    return this.beneficiaryModel.findById(id).populate('insurances').exec();
  }

  async getBeneficiaryByUserId(userId: string): Promise<Beneficiary> {
    return this.beneficiaryModel.findOne({ userId }).exec();
  }
  

}
