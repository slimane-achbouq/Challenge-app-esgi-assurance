import { Module, Provider } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

const clientProxyProvider: Provider = {
  provide: 'PAYMENT_SERVICE',
  useFactory: (): ClientProxy => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin_password@rabbitmq:5672'],
        queue: 'payment_service_queue',
        queueOptions: { durable: false },
      },
    });
  },
};

@Module({
  providers: [clientProxyProvider],
  controllers: [PaymentController],
  exports: [clientProxyProvider],
})
export class PaymentModule {}
