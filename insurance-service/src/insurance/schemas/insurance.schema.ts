import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Insurance extends Document {
  @Prop({ required: true })
  dossierNumber: string;

  @Prop({ required: true })
  insuranceType: string;

  @Prop({ required: true, type: Date })
  coverageStartDate: Date;

  @Prop({ required: true, type: Date })
  coverageEndDate: Date;

  @Prop({ required: true, type: Number })
  insurancePremium: number;

  @Prop({ required: true, enum: ['active', 'cancelled'] })
  insuranceStatus: string;

  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const InsuranceSchema = SchemaFactory.createForClass(Insurance);