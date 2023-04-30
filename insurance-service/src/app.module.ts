import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InsuranceModule } from './insurance/insurance.module';
import { BeneficiaryModule } from './beneficiary/beneficiary.module';



import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/nestjs-mongodb'),
    InsuranceModule,
    BeneficiaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
