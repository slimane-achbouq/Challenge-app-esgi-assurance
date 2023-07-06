import { IInsurance } from "./insurance.interface";


export interface IBeneficiary {
  id?: string;
  firstName: string;
  lastName: string;
  postalAddress: string;
  phoneNumber: string;
  email: string;
  userId: string;
  insurances?: IInsurance[];
  justificatifDomicile?: string;
  permis?: string;
}
