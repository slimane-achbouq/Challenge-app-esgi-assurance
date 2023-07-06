import { Module, Provider } from '@nestjs/common';
import { KpiController } from './kpi.controller';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

const clientProxyProvider: Provider = {
  provide: 'KPI_SERVICE',
  useFactory: (): ClientProxy => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'kpi_service_queue',
        queueOptions: { durable: false },
      },
    });
  },
};

@Module({
  providers: [clientProxyProvider],
  controllers: [KpiController],
  exports: [clientProxyProvider],
})
export class KpiModule {}
