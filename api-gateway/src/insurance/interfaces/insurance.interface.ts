export interface IInsurance {
  id?: string;
  dossierNumber: string;
  insuranceType: string;
  coverageStartDate: Date;
  coverageEndDate: Date;
  insurancePremium: number;
  insuranceStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
  beneficiary: string;
  vehicleId: string;
  quoteId: string;
}
