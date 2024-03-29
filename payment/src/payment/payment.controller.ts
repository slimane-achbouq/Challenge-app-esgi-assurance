import { Body, Controller, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';

@ApiTags('Payment')
@Controller({
  path: 'payment',
})
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern({ cmd: 'getPayments' })
  async getPayments() {
    return this.paymentService.findAll();
  }

  @MessagePattern({ cmd: 'getPayment' })
  async getPayment(@Payload() id) {
    return this.paymentService.findByQuoteId(id);
  }

  @MessagePattern({ cmd: 'createPayment' })
  async createPayment(@Payload() payment: CreatePaymentDto) {
    return this.paymentService.create(payment);
  }

  @MessagePattern({ cmd: 'getPaymentSession' })
  async getPaymentSession(@Payload() data) {
    return this.paymentService.getSession(
      data.title,
      data.tarif,
      data.token,
      data.insurance_id,
    );
  }
}
