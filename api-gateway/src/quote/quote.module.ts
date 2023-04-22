import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // ...
    ClientsModule.register([
      {
        name: 'QUOTE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'nestjs-app',
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [QuoteController]
})
export class QuoteModule {}
