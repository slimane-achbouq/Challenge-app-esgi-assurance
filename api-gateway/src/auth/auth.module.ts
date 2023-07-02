import { Module, Provider } from '@nestjs/common';
import { UserController } from './auth.controller';
import {
  Transport,
  ClientProxyFactory,
  ClientProxy,
} from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.auth';
import { JwtStrategy } from './jwt.strategy';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

const clientProxyProvider: Provider = {
  provide: 'USER_SERVICE',
  useFactory: (): ClientProxy => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: process.env.USER_SERVICE_QUEUE,
        queueOptions: { durable: false },
      },
    });
  },
};

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '6000s' },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [UserController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    clientProxyProvider,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [clientProxyProvider],
})
export class AuthModule {}
