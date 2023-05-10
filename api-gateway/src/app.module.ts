import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InsuranceModule } from './insurance/insurance.module';
import { QuoteModule } from './quote/quote.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [InsuranceModule, QuoteModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
