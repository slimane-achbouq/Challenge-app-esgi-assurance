import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemandModule } from './demand/demand.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://claims-database:27017/db'),
    DemandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
