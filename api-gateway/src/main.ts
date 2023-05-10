import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import * as dotenv from 'dotenv';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { InsuranceModule } from './insurance/insurance.module';
import { QuoteModule } from './quote/quote.module';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin_password@rabbitmq:5672'],
      queue: 'api_gateway_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  // Swagger config
  const swaggerCustomOptions: SwaggerCustomOptions = {
    customSiteTitle: 'HTTP API CHALLENGE',
    swaggerOptions: {
      docExpansion: 'none',
      persistAuthorization: true,
    },
  };

  const config = new DocumentBuilder()
    .setTitle('API HTTP Project')
    .setContact(
      'API HTTP Project',
      'esgi-5IW2.fr',
      '5IW2-Groupe-28@contact.com',
    )
    .setDescription(`Nest summary`)
    .setVersion('1')
    .addBearerAuth({
      description: `[just text field] Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .build();

  const doc = SwaggerModule.createDocument(app, config, {
    include: [AppModule, AuthModule, InsuranceModule, QuoteModule],
  });
  SwaggerModule.setup('api/v1', app, doc, swaggerCustomOptions);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
