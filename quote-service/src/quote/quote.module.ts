import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { Quote } from './quote.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from 'src/vehicle/vehicle.module';


@Module({
  imports: [TypeOrmModule.forFeature([Quote]),
  VehicleModule],
  controllers: [QuoteController],
  providers: [QuoteService]
})
export class QuoteModule {}
