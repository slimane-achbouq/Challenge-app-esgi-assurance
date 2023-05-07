import { IsNotEmpty, IsString, IsEnum, IsNumber, IsUUID } from 'class-validator';
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
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  vehicleId: string;
}

export class UpdateQuoteDto extends PartialType(CreateQuoteDto) {}
