import { IsEmpty, IsString } from 'class-validator';

export class UpdateDemandDto {

  decision: string;

  additionalInfo: string;

  proof;
}
