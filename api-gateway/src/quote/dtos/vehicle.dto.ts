import { IsNotEmpty, IsString, IsEnum, IsNumber, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


enum VehicleType {
    CAR = 'Car',
    MOTORCYCLE = 'Motorcycle',
    TRUCK = 'Truck',
  }
  
  enum PurchaseMode {
    NEW = 'New',
    USED = 'Used',
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
  horsepower: number;

  @IsNotEmpty()
  @IsString()
  licensePlate: string;

  @IsNotEmpty()
  @IsDateString()
  licenseObtainedDate: Date;

  @IsNotEmpty()
  @IsDateString()
  vehicleCirculationDate: Date;

  @IsNotEmpty()
  @IsDateString()
  registrationCardDate: Date;

  @IsNotEmpty()
  @IsString()
  registrationCardHolder: string;

  @IsNotEmpty()
  @IsEnum(PurchaseMode)
  purchaseMode: PurchaseMode;

  @IsNotEmpty()
  @IsString()
  parkingPostalCode: string;


  @IsNotEmpty()
  annualMileage: number;

}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}



