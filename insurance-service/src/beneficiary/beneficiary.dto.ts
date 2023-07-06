import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

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
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  veriviedImage: string;

}

export type UpdateBeneficiaryDto = Partial<CreateBeneficiaryDto>;
