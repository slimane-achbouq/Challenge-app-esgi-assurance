import { IsNotEmpty, IsString, IsNumber, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

export const apiPropertiesCard: {
  [P in keyof Partial<CreateCreditCardDto>]: ApiPropertyOptions;
} = {
  cardNumber: {
    required: true,
    format: 'number',
    example: '1212 1212 1212 1212',
    description: 'card number',
    maxLength: 19,
  },
  expiryDate: {
    required: true,
    format: 'string',
    example: '12/24',
    description: 'expiry date',
  },
  cvc: {
    required: true,
    format: 'string',
    example: '232',
    description: 'cvc card',
    maxLength: 3,
  },
  cardName: {
    required: true,
    format: 'string',
    example: 'Zaid ALAA HAZIM',
    description: 'Credit card Name on Card',
  },
  userEmail: {
    required: true,
    format: 'string',
    example: 'zakaria@gmail.com',
    description: 'User email',
  },
};

export class CreateCreditCardDto {
  @ApiProperty(apiPropertiesCard.cardNumber)
  @IsNotEmpty()
  @IsString()
  cardNumber: string;

  @ApiProperty(apiPropertiesCard.expiryDate)
  @IsNotEmpty()
  @IsString()
  expiryDate: string;

  @ApiProperty(apiPropertiesCard.cvc)
  @IsNotEmpty()
  @IsNumber()
  cvc: number;

  @ApiProperty(apiPropertiesCard.cardName)
  @IsNotEmpty()
  @IsString()
  cardName: string;

  @ApiProperty(apiPropertiesCard.userEmail)
  @IsNotEmpty()
  @IsEmail()
  userEmail: string;
}
