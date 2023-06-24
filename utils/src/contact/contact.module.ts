import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageForm, MessageFormShema } from './shema/message-form.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MessageForm.name, schema: MessageFormShema },
    ]),
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
