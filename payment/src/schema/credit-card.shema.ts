import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { apiPropertiesCard } from 'src/dto/create-credit-card.dto';
import { Document } from 'mongoose';

@Schema({
  timestamps: { createdAt: 'created' },
})
export class CreditCard extends Document {
  @ApiProperty(apiPropertiesCard.cardNumber)
  @Prop({ required: true })
  cardNumber: string;

  @ApiProperty(apiPropertiesCard.expiryDate)
  @Prop({ required: true })
  expiryDate: string;

  @ApiProperty(apiPropertiesCard.cvc)
  @Prop({ required: true })
  cvc: string;

  @ApiProperty(apiPropertiesCard.cardName)
  @Prop({ required: true })
  cardName: string;

  @ApiProperty(apiPropertiesCard.userEmail)
  @Prop({ required: true })
  userEmail: string;
}

export const CreditCardShema = SchemaFactory.createForClass(CreditCard);
