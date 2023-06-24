import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from '../schema/payment.schema';
import { PaymentService } from './payment.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    ],
    providers: [PaymentService],
    controllers: [PaymentController],
})
export class PaymentModule {}
