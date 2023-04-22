import { IsString, IsNumber, IsInt, IsNotEmpty } from 'class-validator';

export class CreateQuoteDto {
  @IsNotEmpty()
  @IsString()
  insuranceType: string;

  @IsNotEmpty()
  @IsString()
  coverage: string;

  @IsNotEmpty()
  @IsNumber()
  insurancePremium: number;

  @IsNotEmpty()
  @IsInt()
  coverageDuration: number;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  vehicleId: string;
}
