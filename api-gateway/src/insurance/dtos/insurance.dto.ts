import { IsNotEmpty, IsString, IsEnum, IsDateString, IsNumber, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


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
  @IsString()
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

  @IsNotEmpty()
  @IsEnum(['active', 'cancelled'])
  insuranceStatus: string;

  @IsNotEmpty()
  beneficiary: string;

  @IsNotEmpty()
  @IsUUID()
  vehicleId: string;

  @IsNotEmpty()
  @IsUUID()
  quoteId: string;
}

export class UpdateInsuranceDto extends PartialType(CreateInsuranceDto) {}
