import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDemandDto {
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  insurance_id: string;

  @IsNotEmpty()
  @IsString()
  decision: string;

  @IsString()
  additionalInfo: string;
}
