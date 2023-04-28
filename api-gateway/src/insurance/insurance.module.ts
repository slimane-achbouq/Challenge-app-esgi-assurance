import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InsuranceController } from './insurance.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INSURANCE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin_password@rabbitmq:5672'],
          queue: 'insurance_service_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [InsuranceController],
})
export class InsuranceModule {}