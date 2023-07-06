import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Insurance } from './insurance.schema';
import { Beneficiary } from '../beneficiary/beneficiary.schema';
import { ClientProxy } from '@nestjs/microservices';
import { CreateInsuranceDto, UpdateInsuranceDto } from './insurance.dto';
import {WinstonModule} from "nest-winston";
import {format, transports} from "winston";

@Injectable()
export class InsuranceService {
  private logger = null;

  constructor(
    @InjectModel(Insurance.name) private insuranceModel: Model<Insurance>,
    @InjectModel(Beneficiary.name) private beneficiaryModel: Model<Beneficiary>,
    @Inject('QUOTE_SERVICE') private readonly quoteServiceClient: ClientProxy
    
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

  async createInsurance(insuranceDto: CreateInsuranceDto): Promise<Insurance> {
    const beneficiary = await this.beneficiaryModel.findById(insuranceDto.beneficiary).exec();
    if (!beneficiary) {
      this.logger.error("createInsurance attempt : beneficiary " + JSON.stringify(insuranceDto.beneficiary) + " not found");
      throw new NotFoundException('Beneficiary not found');
    }
    const newInsurance = new this.insuranceModel({ ...insuranceDto, beneficiary: insuranceDto.beneficiary });
    const savedInsurance = await newInsurance.save();
    beneficiary.insurances.push(savedInsurance._id);
    await beneficiary.save();

   
    const quoteDto ={
      insuranceId:newInsurance['_id'],
      insurancePremium: newInsurance['insurancePremium']
    }
    
    const id =newInsurance.quoteId
    this.quoteServiceClient
    .send({ cmd: 'updateQuote' }, { id, quoteDto })
    .toPromise();

    this.logger.debug("debug", "createInsurance : new insurance for QuoteID " + id + " created");
    return savedInsurance;
  }

  async getInsurances(): Promise<Insurance[]> {
    return this.insuranceModel.find().exec();
  }

  async getInsuranceById(id: string): Promise<Insurance> {
    return this.insuranceModel.findById(id).exec();
  }

  async getInsurancesByUserId(userId: string): Promise<Insurance[]> {
    const beneficiary = await this.beneficiaryModel.findOne({ userId }).exec();

    const idbeneficiary = beneficiary ? beneficiary._id.toString() : null
    if (!beneficiary) {
      return []; // Return an empty array if no beneficiary is found with the provided userId
    }
    return this.insuranceModel.find({beneficiary: idbeneficiary }).exec();
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

    this.logger.debug("debug", "updateInsurance : insurance with QuoteID " + quoteId + " updated");
    return updateDinsurance;

  }

  async deleteInsurance(id: string): Promise<Insurance> {
    return this.insuranceModel.findByIdAndDelete(id).exec();
  }

}