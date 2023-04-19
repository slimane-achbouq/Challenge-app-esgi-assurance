import { Beneficiary } from './beneficiary.schema';

export type CreateBeneficiaryDto = Omit<Beneficiary, 'id' | '_id' | 'insurances'>;

export type UpdateBeneficiaryDto = Partial<Omit<Beneficiary, 'id' | '_id' | 'insurances'>>;
