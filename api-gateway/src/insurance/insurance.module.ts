import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { QuoteModule } from 'src/quote/quote.module';
import { InsuranceController } from './insurance.controller';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '6000s' },
    }),
    QuoteModule,
    AuthModule,
    ClientsModule.register([
      {
        name: 'INSURANCE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.INSURANCE_SERVICE_QUEUE,
          queueOptions: { durable: false },
        },
      },
    ]),
    ThrottlerModule.forRoot({
      ttl: 30,
      limit: 20,
    }),
  ],
  controllers: [InsuranceController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class InsuranceModule {}
