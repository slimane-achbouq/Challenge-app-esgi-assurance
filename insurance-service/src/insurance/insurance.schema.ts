import { Schema,SchemaOptions , Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Beneficiary } from '../beneficiary/beneficiary.schema';
import { Types } from 'mongoose';

enum InsuranceType {
  LIABILITY = 'Liability',
  COLLISION = 'Collision',
  COMPREHENSIVE = 'Comprehensive',
}

@Schema()
export class Insurance extends Document {
  @Prop({ type: Number, unique: true})
  dossierNumber: number;

  @Prop({ required: true, enum: InsuranceType })
  insuranceType: string;

  @Prop({ required: true, type: Date })
  coverageStartDate: Date;

  @Prop({ required: true, type: Date })
  coverageEndDate: Date;

  @Prop({ required: true, type: Number })
  insurancePremium: number;



  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Beneficiary' })
  beneficiary: Beneficiary;

  @Prop({ required: true })
  vehicleId: string;

  @Prop({ required: true, type: String })
  quoteId: string;

  @Prop({ type: Boolean, default: false })
  status: boolean;

  @Prop({ type: Boolean, default: false })
  verifiedId: boolean;

  

}

export const InsuranceSchema = SchemaFactory.createForClass(Insurance);