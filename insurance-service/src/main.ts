import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: process.env.INSURANCE_SERVICE_QUEUE,
      queueOptions: { durable: false },
    },
  });
  app.listen().then(() => console.log('Microservice listening on RabbitMQ'));
}
bootstrap();
