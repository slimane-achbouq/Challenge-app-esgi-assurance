import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Insurance } from '../insurance/insurance.schema';
import { Types } from 'mongoose';


@Schema()
export class Beneficiary extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  postalAddress: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  userId: string;

  @Prop([{ type: Types.ObjectId, ref: 'Insurance' }])
  insurances: Insurance[];

  @Prop({ type: String, required: false })
  justificatifDomicile: string;

  @Prop({ type: String, required: false })
  permis: string;

  
}

export const BeneficiarySchema = SchemaFactory.createForClass(Beneficiary);