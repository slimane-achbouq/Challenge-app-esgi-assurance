import { Injectable } from '@nestjs/common';
import { MessageFormDto } from './dto/message-form.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MessageForm } from './shema/message-form.shema';
import { Model } from 'mongoose';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(MessageForm.name)
    readonly messageContactModel: Model<MessageForm>,
  ) {}

  createMessageContact(messageDto: MessageFormDto) {
    console.log(messageDto);
    const messageContact = new this.messageContactModel(messageDto);
    messageContact.save();

    return {
      message: 'Message was created with success !',
    };
  }
}
