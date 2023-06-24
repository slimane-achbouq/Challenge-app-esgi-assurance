import {Body, Controller, Inject, Param, Post, Get, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {ApiTags} from '@nestjs/swagger';
import {CreatePaymentDto} from './dto/create-payment.dto';

@ApiTags('Payment')
@Controller({
    path: 'payment',
})
export class PaymentController {
    constructor(
        @Inject('PAYMENT_SERVICE') private readonly paymentService: ClientProxy,
    ) {
    }

    @Post()
    async createPayment(
        @Body() payment: CreatePaymentDto) {
        return this.paymentService
            .send({cmd: 'createPayment'}, payment)
            .toPromise();
    }

    @Get()
    async getPayments() {
        const payment = await this.paymentService
            .send({cmd: 'getPayments'}, '')
            .toPromise();

        return payment;
    }

    @Get("getSession/:title/:tarif/:token/:insurance_id")
    async getSession(@Param('title') title: string, @Param('tarif') tarif: string, @Param('token') token: string, @Param('insurance_id') insurance_id: string) {
        const payment = await this.paymentService
            .send({cmd: 'getPaymentSession'}, {title, tarif, token, insurance_id})
            .toPromise();

        return payment;
    }

    /*async getPaymentSession() {
        const payment = await this.paymentService
            .send({cmd: 'getPaymentSession'}, '')
            .toPromise();

        return payment;
    }*/
}
