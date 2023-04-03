import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP_PORT || 3000);

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
    .setContact('API HTTP Project', 'esgi-5IW2.fr', '5IW2-Groupe-5@contact.com')
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
    include: [AppModule],
  });
  SwaggerModule.setup('api', app, doc, swaggerCustomOptions);

  const welcomeLog = `Application is running on: ${await app.getUrl()}`;
  Logger.log(welcomeLog, 'NestApplication');
}
bootstrap();
