import { Module, Provider } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

const clientProxyProvider: Provider = {
  provide: 'PAYMENT_SERVICE',
  useFactory: (): ClientProxy => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'payment_service_queue',
        queueOptions: { durable: false },
      },
    });
  },
};

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 30,
      limit: 20,
    }),
  ],
  providers: [
    clientProxyProvider,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [PaymentController],
  exports: [clientProxyProvider],
})
export class PaymentModule {}
