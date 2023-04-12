import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Insurance, InsuranceSchema } from './insurance.schema';
import { Beneficiary, BeneficiarySchema } from '../beneficiary/beneficiary.schema';
import { InsuranceController } from './insurance.controller';
import { InsuranceService } from './insurance.service';
import { BeneficiaryModule } from '../beneficiary/beneficiary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Insurance.name, schema: InsuranceSchema },
      { name: Beneficiary.name, schema: BeneficiarySchema },
    ]),
    BeneficiaryModule
  ],
  controllers: [InsuranceController],
  providers: [InsuranceService],
})
export class InsuranceModule {}