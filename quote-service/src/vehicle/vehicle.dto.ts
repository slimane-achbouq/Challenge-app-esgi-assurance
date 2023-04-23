import { IsOptional } from 'class-validator';
import { IsString, IsNumber, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  vehicleType: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsInt()
  @Min(10)
  @Max(999)
  horsepower: number;

  @IsNotEmpty()
  @IsString()
  licensePlate: string;

  @IsNotEmpty()
  licenseObtainedDate: Date;

  @IsNotEmpty()
  vehicleCirculationDate: Date;

  @IsNotEmpty()
  registrationCardDate: Date;

  @IsNotEmpty()
  @IsString()
  registrationCardHolder: string;

  @IsNotEmpty()
  @IsString()
  purchaseMode: string;

  @IsNotEmpty()
  @IsString()
  parkingPostalCode: string;

  @IsNotEmpty()
  @IsString()
  parkingType: string;

  @IsNotEmpty()
  @IsInt()
  annualMileage: number;

  @IsOptional()
  @IsString()
  carteGrise?: string;
}

