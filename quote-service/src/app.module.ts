import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteModule } from './quote/quote.module';
import { VehicleModule } from './vehicle/vehicle.module';
import {WinstonModule} from "nest-winston";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // Disable this in production
    }),
    QuoteModule,
    VehicleModule,
    WinstonModule.forRoot({
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
