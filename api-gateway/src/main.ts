import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'auth',
        brokers: ['10.5.1.145:9092'],
      },
      consumer: {
        groupId: 'auth-consumer',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
