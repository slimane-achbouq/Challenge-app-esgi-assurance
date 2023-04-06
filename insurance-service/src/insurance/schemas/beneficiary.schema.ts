import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Beneficiary extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  postalAddress: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  email: string;
}

export const BeneficiarySchema = SchemaFactory.createForClass(Beneficiary);