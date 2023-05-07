import { IQuote } from './quote.interface';

export interface IVehicle {
  id: string;
  vehicleType: string;
  brand: string;
  model: string;
  horsepower: number;
  licensePlate: string;
  licenseObtainedDate: Date;
  vehicleCirculationDate: Date;
  registrationCardDate: Date;
  registrationCardHolder: string;
  purchaseMode: string;
  parkingPostalCode: string;
  parkingType: string;
  annualMileage: number;
  carteGrise: string;
  quote: IQuote;
}
