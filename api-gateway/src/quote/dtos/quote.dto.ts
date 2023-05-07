import { IsNotEmpty, IsString, IsEnum, IsNumber } from 'class-validator';
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

export class CreateQuoteDto {
  @IsNotEmpty()
  @IsNumber()
  quoteNumber: number;

  @IsNotEmpty()
  @IsEnum(InsuranceType)
  insuranceType: InsuranceType;

  @IsNotEmpty()
  @IsEnum(Coverage)
  coverage: Coverage;

  @IsNotEmpty()
  @IsNumber()
  insurancePremium: number;

  @IsNotEmpty()
  @IsNumber()
  coverageDuration: number;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsString()
  insuranceId: string;
}

export class UpdateQuoteDto extends PartialType(CreateQuoteDto) {}
