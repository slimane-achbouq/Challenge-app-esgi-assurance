import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

@Schema()
export class Demand extends Document {
  @Prop({ required: true })
  insurance_id: string;

  @Prop({ required: false, default: '0' })
  status: string;

  @Prop({ required: true })
  reason: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  decision: string;

  @Prop({ required: false, default: '' })
  additionalInfo: string;

  @Prop({ required: true, default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;

  @Prop({ type: Buffer, required: false }) 
  proof: Buffer;

  @Prop({ required: true, default: 'admin@admin.fr' })
  userMail: string;
}

export const DemandSchema = SchemaFactory.createForClass(Demand);
