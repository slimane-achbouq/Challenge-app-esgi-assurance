import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from '../schema/payment.schema';
import { PaymentService } from './payment.service';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
        ConfigModule.forRoot(),
    ],
    providers: [PaymentService],
    controllers: [PaymentController],
})
export class PaymentModule {}
