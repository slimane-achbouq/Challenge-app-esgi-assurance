import { IVehicle } from './vehicle.interface';

export interface IQuote {
  id: string;
  quoteNumber: number;
  insuranceType: string;
  coverage: string;
  insurancePremium: number;
  coverageDuration: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  insuranceId: string;
  vehicle: IVehicle;
}
