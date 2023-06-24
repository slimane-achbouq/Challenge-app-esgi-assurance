import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {HydratedDocument, Model, now} from 'mongoose';
import {Payment} from '../schema/payment.schema';
import {CreatePaymentDto} from '../dto/create-payment.dto';

@Injectable()
export class PaymentService {
    constructor(
        @InjectModel('Payment') private readonly paymentModel: Model<Payment>
    ) {
    }

    async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {

        const { ...rest} = createPaymentDto;
        const createdPayment = new this.paymentModel({...rest});
        return createdPayment.save();
    }

    async findAll(): Promise<Payment[]> {
        return this.paymentModel.find().exec();
    }

    async findById(id: string): Promise<Payment> {
        return this.paymentModel.findById(id).exec();
    }

    async getSession(): Promise<any> {

    }
}
