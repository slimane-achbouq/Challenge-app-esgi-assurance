import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  quote_id: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
