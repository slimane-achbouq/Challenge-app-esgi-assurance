import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDemandDto {
  @IsNotEmpty()
  @IsString()
  insurance_id: string;

  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  proof: string;
}
