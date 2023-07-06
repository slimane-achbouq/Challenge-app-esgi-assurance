import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Insurance, InsuranceSchema } from './insurance.schema';
import { Beneficiary, BeneficiarySchema } from '../beneficiary/beneficiary.schema';
import { InsuranceController } from './insurance.controller';
import { InsuranceService } from './insurance.service';
import { BeneficiaryModule } from '../beneficiary/beneficiary.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'QUOTE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.QUOTE_SERVICE_QUEUE,
          queueOptions: { durable: false },
        },
      },
    ]),
    MongooseModule.forFeature([
      { name: Insurance.name, schema: InsuranceSchema },
      { name: Beneficiary.name, schema: BeneficiarySchema },
    ]),
    BeneficiaryModule
  ],
  controllers: [InsuranceController],
  providers: [InsuranceService],
  exports: [InsuranceService]
})
export class InsuranceModule {}