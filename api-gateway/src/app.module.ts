import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InsuranceModule } from './insurance/insurance.module';
import { QuoteModule } from './quote/quote.module';
import { UtilsModule } from './utils/utils.module';
import { AuthModule } from './auth/auth.module';
import { ClaimsModule } from './claims/claims.module';

@Module({
  imports: [InsuranceModule, QuoteModule, AuthModule, UtilsModule, ClaimsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
