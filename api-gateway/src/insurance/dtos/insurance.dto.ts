import { IsNotEmpty, IsString, IsEnum, IsDateString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateInsuranceDto {
  @IsNotEmpty()
  @IsString()
  dossierNumber: string;

  @IsNotEmpty()
  @IsString()
  insuranceType: string;

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
  @IsString()
  vehicleId: string;

  @IsNotEmpty()
  @IsString()
  quoteId: string;
}

export class UpdateInsuranceDto extends PartialType(CreateInsuranceDto) {}
