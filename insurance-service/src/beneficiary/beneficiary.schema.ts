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

  @Prop({ type: Buffer, required: false })
  justificatifDomicile: Buffer;

  @Prop({ type: Buffer, required: false })
  permis: Buffer;

  
}

export const BeneficiarySchema = SchemaFactory.createForClass(Beneficiary);