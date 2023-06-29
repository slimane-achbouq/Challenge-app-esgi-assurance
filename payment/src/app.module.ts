import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PaymentModule} from "./payment/payment.module";
import {MongooseModule} from "@nestjs/mongoose";
import { ConfigModule } from '@nestjs/config';
import {WinstonModule} from "nest-winston";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    PaymentModule,
    WinstonModule.forRoot({
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}