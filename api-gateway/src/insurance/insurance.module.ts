import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { QuoteModule } from 'src/quote/quote.module';
import { InsuranceController } from './insurance.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '60s' },
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
  ],
  controllers: [InsuranceController],
})
export class InsuranceModule {}
