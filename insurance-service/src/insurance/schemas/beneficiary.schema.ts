import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Insurance } from './insurance.schema';
import { Types } from 'mongoose';


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

  @Prop([{ type: Types.ObjectId, ref: 'Insurance' }])
  insurances: Insurance[];
}

export const BeneficiarySchema = SchemaFactory.createForClass(Beneficiary);