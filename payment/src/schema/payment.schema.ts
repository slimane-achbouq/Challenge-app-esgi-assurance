import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

@Schema()
export class Payment extends Document {
  @Prop({ required: true })
  quote_id: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
