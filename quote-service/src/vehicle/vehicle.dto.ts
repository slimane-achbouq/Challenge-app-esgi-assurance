import { IsOptional } from 'class-validator';
import { IsString, IsNumber, IsInt, Min, Max, IsNotEmpty, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


enum VehicleType {
  CAR = 'Car',
  MOTORCYCLE = 'Motorcycle',
  TRUCK = 'Truck',
}

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsEnum(VehicleType)
  vehicleType: VehicleType;

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

  carteGrise;

}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}


