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
    const messageContact = new this.messageContactModel(messageDto);
    messageContact.save();

    return {
      message: 'Message was created with success !',
    };
  }

  getAllMessages() {
    const messages = this.messageContactModel.find();
    return messages;
  }

  async validateMessage(id: string) {
    const message = await this.messageContactModel.findById(id).exec();

    return this.messageContactModel
      .findByIdAndUpdate(id, { isValide: true })
      .exec();
  }
}
