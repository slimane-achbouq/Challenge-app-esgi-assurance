import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import { KpiModule } from './kpi/kpi.module';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGODB_URL),
        KpiModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
