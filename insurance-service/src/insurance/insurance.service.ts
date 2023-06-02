import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Insurance } from './insurance.schema';
import { Beneficiary } from '../beneficiary/beneficiary.schema';
import { ClientProxy } from '@nestjs/microservices';
import { CreateInsuranceDto, UpdateInsuranceDto } from './insurance.dto';

@Injectable()
export class InsuranceService {
  constructor(
    @InjectModel(Insurance.name) private insuranceModel: Model<Insurance>,
    @InjectModel(Beneficiary.name) private beneficiaryModel: Model<Beneficiary>,
    @Inject('QUOTE_SERVICE') private readonly quoteServiceClient: ClientProxy
    
  ) {}

  async createInsurance(insuranceDto: CreateInsuranceDto): Promise<Insurance> {
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
    return this.insuranceModel.find().exec();
  }

  async getInsuranceById(id: string): Promise<Insurance> {
    return this.insuranceModel.findById(id).exec();
  }

  async updateInsurance(id: string, insuranceDto: UpdateInsuranceDto): Promise<Insurance> {
    let  insurance = await this.insuranceModel.findById(id).exec();
    const updateDinsurance = this.insuranceModel.findByIdAndUpdate(id, insuranceDto, { new: true }).exec();

      
    const quoteDto = {};
    if (insuranceDto['insuranceType'] && insurance['insuranceType'] !== insuranceDto['insuranceType']) {
      quoteDto['insuranceType'] = insuranceDto['insuranceType'];
    }

    if (insuranceDto['insurancePremium'] && insurance['insurancePremium'] !== insuranceDto['insurancePremium'] ) {
      quoteDto['insurancePremium'] = insuranceDto['insurancePremium'];
    }
    
    const quoteId = insurance['quoteId']

    this.quoteServiceClient.send({ cmd: 'updateQuote' }, { id:quoteId, quoteDto }).toPromise();
    return updateDinsurance;

  }

  async deleteInsurance(id: string): Promise<Insurance> {
    return this.insuranceModel.findByIdAndDelete(id).exec();
  }

}