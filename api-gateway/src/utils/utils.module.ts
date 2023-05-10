import { Module, Provider } from '@nestjs/common';
import { UtilsController } from './utils.controller';
import {
  ClientProxy,
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

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
  imports: [],
  providers: [clientProxyProvider],
  controllers: [UtilsController],
  exports: [clientProxyProvider],
})
export class UtilsModule {}
