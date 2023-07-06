import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3006);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin_password@rabbitmq:5672'],
          queue: 'payment_service_queue',
          queueOptions: { durable: false },
        },
      },
  );

  app.listen().then(() => Logger.log('Microservice listening on RabbitMQ'));
}
bootstrap();

