import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: { createdAt: 'created' },
})
export class MessageForm extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  object: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: false })
  isValide: boolean;
}

export const MessageFormShema = SchemaFactory.createForClass(MessageForm);
