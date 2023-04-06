import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Insurance, InsuranceSchema } from './schemas/insurance.schema';
import { Beneficiary, BeneficiarySchema } from './schemas/beneficiary.schema';
import { InsuranceController } from './insurance.controller';
import { InsuranceService } from './insurance.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Insurance.name, schema: InsuranceSchema },
      { name: Beneficiary.name, schema: BeneficiarySchema },
    ]),
  ],
  controllers: [InsuranceController],
  providers: [InsuranceService],
})
export class InsuranceModule {}