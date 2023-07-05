import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import * as dotenv from 'dotenv';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { InsuranceModule } from './insurance/insurance.module';
import { QuoteModule } from './quote/quote.module';
import { UtilsModule } from './utils/utils.module';
import { ClaimsModule } from './claims/claims.module';
import { PaymentModule } from './payment/payment.module';
import { KpiModule } from './kpi/kpi.module';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: process.env.API_GATEWAY_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  });

  // Global pipe validations
  app.useGlobalPipes(
    new ValidationPipe({
      // transform: true,
      // disableErrorMessages: true,
    }),
  );

  // Cors
  app.enableCors({
    origin: process.env.CLIENT_URL,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
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
    include: [
      AppModule,
      AuthModule,
      InsuranceModule,
      QuoteModule,
      UtilsModule,
      ClaimsModule,
      PaymentModule,
      KpiModule,
    ],
  });
  SwaggerModule.setup('api/v1', app, doc, swaggerCustomOptions);

  await app.startAllMicroservices();
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
