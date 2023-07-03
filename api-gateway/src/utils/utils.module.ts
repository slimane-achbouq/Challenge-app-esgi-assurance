import { Module, Provider } from '@nestjs/common';
import { UtilsController } from './utils.controller';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

const clientProxyProvider: Provider = {
  provide: 'UTILS_SERVICE',
  useFactory: (): ClientProxy => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin_password@rabbitmq:5672'],
        queue: 'utils_service_queue',
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
  controllers: [UtilsController],
  exports: [clientProxyProvider],
})
export class UtilsModule {}
