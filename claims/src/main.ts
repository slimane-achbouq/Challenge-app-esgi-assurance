import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerCustomOptions,
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import { DemandModule } from './demand/demand.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
    include: [AppModule, DemandModule],
  });
  SwaggerModule.setup('api/v1', app, doc, swaggerCustomOptions);
  await app.listen(3006);
}
bootstrap();
