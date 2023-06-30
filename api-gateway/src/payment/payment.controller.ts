import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Get,
  Put,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Payment')
@Controller({
  path: 'payment',
})
export class PaymentController {
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly paymentService: ClientProxy,
  ) {}

  @Post()
  async createPayment(@Body() payment: CreatePaymentDto) {
    return this.paymentService
      .send({ cmd: 'createPayment' }, payment)
      .toPromise();
  }

  @Get()
  async getPayments() {
    const payment = await this.paymentService
      .send({ cmd: 'getPayments' }, '')
      .toPromise();

    return payment;
  }

  @Get(':id')
  async getPayment(@Param('id') id: string) {
    const payment = await this.paymentService
      .send({ cmd: 'getPayment' }, id)
      .toPromise();

    return payment;
  }

  @Get('getSession/:title/:tarif/:token/:insurance_id')
  async getSession(
    @Param('title') title: string,
    @Param('tarif') tarif: string,
    @Param('token') token: string,
    @Param('insurance_id') insurance_id: string,
  ) {
    const payment = await this.paymentService
      .send({ cmd: 'getPaymentSession' }, { title, tarif, token, insurance_id })
      .toPromise();

    return payment;
  }

  /*async getPaymentSession() {
        const payment = await this.paymentService
            .send({cmd: 'getPaymentSession'}, '')
            .toPromise();

        return payment;
    }*/

  @ApiBearerAuth()
  @Post('createCreditCard')
  @ApiOkResponse({
    description: 'Create creadit card',
    type: CreateCreditCardDto,
  })
  @ApiBody({
    description: 'Create creadit card',
    required: true,
    type: CreateCreditCardDto,
  })
  @UseGuards(JwtAuthGuard)
  async createCreditCard(@Body() createCreditCardDto: CreateCreditCardDto) {
    try {
      return this.paymentService
        .send({ cmd: 'createCreditCard' }, createCreditCardDto)
        .toPromise();
    } catch (err) {
      return err;
    }
  }

  @ApiBearerAuth()
  @Get('findCreditCard/:email')
  @UseGuards(JwtAuthGuard)
  async findCreditCard(@Param('email') email: string) {
    try {
      return this.paymentService
        .send({ cmd: 'findCreditCardByEmail' }, email)
        .toPromise();
    } catch (err) {
      return err;
    }
  }

  @ApiBearerAuth()
  @Delete('deleteCreditCard/:email')
  @UseGuards(JwtAuthGuard)
  async deleteCreditCard(@Param('email') email: string) {
    try {
      return this.paymentService
        .send({ cmd: 'deleteCreditCard' }, email)
        .toPromise();
    } catch (err) {
      return err;
    }
  }
}
