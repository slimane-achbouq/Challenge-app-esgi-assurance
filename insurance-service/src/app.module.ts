import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InsuranceModule } from './insurance/insurance.module';
import { BeneficiaryModule } from './beneficiary/beneficiary.module';



import * as dotenv from 'dotenv';
import {WinstonModule} from "nest-winston";
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    InsuranceModule,
    BeneficiaryModule,
    WinstonModule.forRoot({
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
