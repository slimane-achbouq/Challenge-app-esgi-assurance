import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { MailModule } from './mail/mail.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.TCP,
  //   options: {
  //     host: '0.0.0.0',
  //     port: 3004,
  //   },
  // });

  // // Validation
  // app.useGlobalPipes(new ValidationPipe());

  // Swagger config
  const swaggerCustomOptions: SwaggerCustomOptions = {
    customSiteTitle: 'HTTP API CHALLENGE',
    swaggerOptions: {
      docExpansion: 'none',
      persistAuthorization: true,
    },
  };

  const config = new DocumentBuilder()
    .setTitle('Nest Project')
    .setContact('API HTTP Project', 'esgi-5IW2.fr', '5IW2-Groupe-5@contact.com')
    .setDescription(`Nest utils`)
    .setVersion('1')
    .build();

  const doc = SwaggerModule.createDocument(app, config, {
    include: [AppModule, MailModule],
  });
  SwaggerModule.setup('api', app, doc, swaggerCustomOptions);

  // await app.listen();
  // const welcomeLog = `Application is running on: 3004}`;

  await app.listen(process.env.APP_PORT || 3004);
}
bootstrap();
