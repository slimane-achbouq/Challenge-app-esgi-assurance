import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // ...
    ClientsModule.register([
      {
        name: 'QUOTE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin_password@rabbitmq:5672'],
          queue: 'quote_service_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [QuoteController]
})
export class QuoteModule {}
