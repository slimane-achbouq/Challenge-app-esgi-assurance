import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { ContactModule } from './contact/contact.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MailModule,
    ContactModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
