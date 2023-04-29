import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import { KpiModule } from './kpi/kpi.module';
import {VisitModule} from "./visit/visit.module";
import {VisitorModule} from "./visitor/visitor.module";
import {TimeModule} from "./time/time.module";
import {BrowserModule} from "./browser/browser.module";

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGODB_URL),
        KpiModule,
        VisitModule,
        VisitorModule,
        TimeModule,
        BrowserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
