import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from '../schema/payment.schema';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  private logger = null;

  constructor(
    @InjectModel('Payment') private readonly paymentModel: Model<Payment>,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
    this.logger = WinstonModule.createLogger({
      transports: [
        new transports.File({
          level: 'debug',
          filename: 'logs/debug.log',
          format: format.combine(format.timestamp(), format.json()),
        }),
        new transports.File({
          level: 'error',
          filename: 'logs/error.log',
          format: format.combine(format.timestamp(), format.json()),
        }),
        new transports.Console({
          format: format.combine(format.colorize({ message: true })),
        }),
      ],
    });
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    this.logger.debug(
      'debug',
      'createPayment : new payment for quote ID ' +
        createPaymentDto.quote_id +
        ', €' +
        createPaymentDto.price,
    );
    const { ...rest } = createPaymentDto;
    const createdPayment = new this.paymentModel({ ...rest });
    return createdPayment.save();
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.find().exec();
  }

  async findById(id: string): Promise<Payment> {
    return this.paymentModel.findById(id).exec();
  }

  async findByQuoteId(id: string): Promise<Payment> {
    return this.paymentModel.findOne({ quote_id: id }).exec();
  }

  async getSession(title, tarif, token, insurance_id) {
    this.logger.debug(
      'debug',
      'Payement getSession : new payment session for insurance ID ' +
        insurance_id,
    );
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.CLIENT_URL}/payment/success/${token}/${insurance_id}/${tarif}`,
      cancel_url: `${process.env.CLIENT_URL}/payment/failed`,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: tarif * 100,
            product_data: {
              name: title,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
    });

    return JSON.stringify(checkoutSession);
  }
}
