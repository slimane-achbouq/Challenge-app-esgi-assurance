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
  @IsNumber()
  insurancePremium: number;

  @IsNotEmpty()
  @IsEnum(['active', 'cancelled'])
  insuranceStatus: string;


  @IsNotEmpty()
  @IsUUID()
  quoteId: string;

  @IsNotEmpty()
  beneficiary: string;

  @IsNotEmpty()
  @IsUUID()
  vehicleId: string;
}

export class UpdateInsuranceDto extends PartialType(CreateInsuranceDto) {}

export class CreateModifiedInsuranceDto extends OmitType(CreateInsuranceDto, ['insuranceType','insurancePremium', 'insuranceStatus','vehicleId','beneficiary','dossierNumber']) {}