import { IsNotEmpty, IsString, IsEnum, IsDateString, IsNumber, IsUUID } from 'class-validator';
import { PartialType , OmitType} from '@nestjs/mapped-types';


enum InsuranceType {
  LIABILITY = 'Liability',
  COLLISION = 'Collision',
  COMPREHENSIVE = 'Comprehensive',
}

enum Coverage {
  BASIC = 'Basic',
  STANDARD = 'Standard',
  PREMIUM = 'Premium',
}

export class CreateInsuranceDto {
  @IsNotEmpty()
  @IsNumber()
  dossierNumber: number;

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
  insurancePremium: number;

  @IsNotEmpty()
  @IsUUID()
  quoteId: string;

  @IsNotEmpty()
  beneficiary: string;

  @IsNotEmpty()
  @IsUUID()
  vehicleId: string;

  status: boolean;
  
  verifiedId: boolean;
}

export class UpdateInsuranceDto extends PartialType(CreateInsuranceDto) {}

export class CreateModifiedInsuranceDto extends OmitType(CreateInsuranceDto, ['insuranceType','status','vehicleId','beneficiary','dossierNumber']) {}