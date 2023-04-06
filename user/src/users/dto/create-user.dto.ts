import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  lastname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  adresse: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNumber()
  @IsNotEmpty()
  codeCity: number;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  refreshToken: string;
}
