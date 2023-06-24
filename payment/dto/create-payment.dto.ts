import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  insurance_id: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
