import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Payment} from '../schema/payment.schema';
import {CreatePaymentDto} from '../dto/create-payment.dto';
import {ConfigService} from "@nestjs/config";
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
    private stripe: Stripe;

    constructor(
        @InjectModel('Payment') private readonly paymentModel: Model<Payment>,
        private configService: ConfigService
    ) {
        this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2022-11-15',
        });
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

    async getSession(title, tarif, token, insurance_id) {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

        const checkoutSession = await stripe.checkout.sessions.create({
            success_url: `http://localhost:5173/success/${token}/${insurance_id}`,
            cancel_url: `http://localhost:5173/error/${token}/${insurance_id}`,
            line_items: [{
                price_data: {
                    currency: 'eur',
                    unit_amount: tarif * 100,
                    product_data: {
                        name: title,
                    },
                },
                quantity: 1,
            }],
            mode: 'payment',
        });

        return JSON.stringify(checkoutSession);
    }
}