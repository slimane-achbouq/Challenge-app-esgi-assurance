import { Module, Provider } from '@nestjs/common';
import { ClaimsController } from './claims.controller';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

const clientProxyProvider: Provider = {
  provide: 'CLAIMS_SERVICE',
  useFactory: (): ClientProxy => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin_password@rabbitmq:5672'],
        queue: 'claims_service_queue',
        queueOptions: { durable: false },
      },
    });
  },
};

@Module({
  providers: [clientProxyProvider],
  controllers: [ClaimsController],
  exports: [clientProxyProvider],
})
export class ClaimsModule {}
