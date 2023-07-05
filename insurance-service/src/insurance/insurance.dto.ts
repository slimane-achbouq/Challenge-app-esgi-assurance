import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Beneficiary } from '../beneficiary/beneficiary.schema';

enum InsuranceType {
  LIABILITY = 'Liability',
  COLLISION = 'Collision',
  COMPREHENSIVE = 'Comprehensive',
}

export class CreateInsuranceDto {
  @IsNotEmpty()
  dossierNumber: string;

  @IsNotEmpty()
  @IsEnum(InsuranceType)
  insuranceType: InsuranceType;

  @IsNotEmpty()
  @IsDateString()
  coverageStartDate: Date;

  @IsNotEmpty()
  @IsDateString()
  coverageEndDate: Date;

  @IsNotEmpty()
  @IsNumber()
  insurancePremium: number;


  beneficiary: Beneficiary;

  @IsNotEmpty()
  vehicleId: string;

  @IsNotEmpty()
  quoteId: string;

  status: boolean; 

  verifiedId: boolean;
}

export type UpdateInsuranceDto  = Partial<CreateInsuranceDto>;
