// api-gateway/src/quote/dtos/vehicle-quote.dto.ts
import { CreateQuoteDto } from './quote.dto';
import { CreateVehicleDto } from './vehicle.dto';
import { IsNotEmpty, IsString, IsEnum, IsNumber, IsUUID,IsDateString } from 'class-validator';


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

  enum VehicleType {
    CAR = 'Car',
    MOTORCYCLE = 'Motorcycle',
    TRUCK = 'Truck',
  }
  
  enum PurchaseMode {
    NEW = 'New',
    USED = 'Used',
  }

export class CreateVehicleQuoteDto {
    
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
    @IsString()
    parkingType: string;
  
    @IsNotEmpty()
    annualMileage: number;  

    @IsNotEmpty()
    @IsEnum(InsuranceType)
    insuranceType: InsuranceType;

    @IsNotEmpty()
    @IsEnum(Coverage)
    coverage: Coverage;


    
}
