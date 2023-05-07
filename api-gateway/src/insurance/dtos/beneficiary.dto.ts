import { IBeneficiary } from "../interfaces/beneficiary.interface";
import { IsNotEmpty, IsString, IsOptional, IsUUID} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateBeneficiaryDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  postalAddress: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

}

export class UpdateBeneficiaryDto extends PartialType(CreateBeneficiaryDto) {}
