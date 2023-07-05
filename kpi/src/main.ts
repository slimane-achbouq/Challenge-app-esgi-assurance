import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'kpi_service_queue',
        queueOptions: { durable: false },
      },
    },
  );
  app.listen().then(() => Logger.log('Kpi microservice listening on RabbitMQ'));
}
bootstrap();
