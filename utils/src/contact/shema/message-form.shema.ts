import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { apiPropertiesMessageForm } from '../dto/message-form.dto';
import { Document } from 'mongoose';

export class MessageForm extends Document {
  @ApiProperty(apiPropertiesMessageForm.email)
  @Prop({ required: true })
  email: string;

  @ApiProperty(apiPropertiesMessageForm.firstname)
  @Prop({ required: true })
  firstname: string;

  @ApiProperty(apiPropertiesMessageForm.lastname)
  @Prop({ required: true })
  lastname: string;

  @ApiProperty(apiPropertiesMessageForm.object)
  @Prop({ required: true })
  object: string;

  @ApiProperty(apiPropertiesMessageForm.message)
  @Prop({ required: true })
  message: string;
}

export const MessageFormShema = SchemaFactory.createForClass(MessageForm);
