import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InsuranceModule } from './insurance/insurance.module';
import { QuoteModule } from './quote/quote.module';


@Module({
  imports: [
    InsuranceModule,
    QuoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
