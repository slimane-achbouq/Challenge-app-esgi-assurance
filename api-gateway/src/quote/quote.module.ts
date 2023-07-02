import { Module, Provider } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import {
  Transport,
  ClientProxyFactory,
  ClientProxy,
} from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

const clientProxyProvider: Provider = {
  provide: 'QUOTE_SERVICE',
  useFactory: (): ClientProxy => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: process.env.QUOTE_SERVICE_QUEUE,
        queueOptions: { durable: false },
      },
    });
  },
};

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '6000s' },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5,
    }),
  ],
  providers: [
    clientProxyProvider,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [QuoteController],
  exports: [clientProxyProvider],
})
export class QuoteModule {}
