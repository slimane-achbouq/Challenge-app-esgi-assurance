import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  MaxDate,
  MinDate,
  MinLength,
} from 'class-validator';
import { Statut } from '../enums/statut.enum';
import { Role } from '../enums/roles.enum';
import { Transform } from 'class-transformer';

const today = new Date();

// Calculate the date 18 years ago
const minDate = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate(),
);

export const apiPropertiesUser: {
  [P in keyof Partial<CreateUserDto>]: ApiPropertyOptions;
} = {
  firstname: {
    required: true,
    format: 'string',
    example: 'Zakaria',
    description: 'User firstname',
    minLength: 2,
    maxLength: 24,
  },
  lastname: {
    required: true,
    format: 'string',
    example: 'ATTAOUI',
    description: 'User lastname',
    minLength: 2,
    maxLength: 24,
  },
  email: {
    required: true,
    format: 'string',
    example: 'zakaria@gmail.com',
    description: 'User Email',
  },
  password: {
    required: true,
    format: 'string',
    example: 'zakaria1998',
    description: 'User password',
  },
  adresse: {
    required: true,
    format: 'string',
    example: '8 impasse de la chapelle',
    description: 'User adresse',
  },
  city: {
    required: true,
    format: 'string',
    example: 'PARIS',
    description: 'User city',
  },
  codeCity: {
    required: true,
    format: 'number',
    example: '75018',
    description: 'User city code',
  },
  age: {
    required: true,
    format: 'Date',
    example: '2000-05-02T22:28:07.468Z',
    description: 'User age',
  },
  phoneNumber: {
    required: true,
    format: 'string',
    example: '+33749380088',
    description: 'User phone number',
  },
};

export class CreateUserDto {
  @ApiProperty(apiPropertiesUser.firstname)
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  firstname: string;

  @ApiProperty(apiPropertiesUser.lastname)
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  lastname: string;

  @ApiProperty(apiPropertiesUser.email)
  @IsEmail()
  email: string;

  @ApiProperty(apiPropertiesUser.adresse)
  @IsString()
  @IsNotEmpty()
  adresse: string;

  @ApiProperty(apiPropertiesUser.city)
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty(apiPropertiesUser.codeCity)
  @IsNumber()
  @IsNotEmpty()
  codeCity: number;

  @ApiProperty(apiPropertiesUser.phoneNumber)
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: number;

  @ApiProperty(apiPropertiesUser.password)
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty(apiPropertiesUser.age)
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MaxDate(new Date())
  @MinDate(minDate)
  age: number;

  isValide: boolean;

  refreshToken: string;

  validationToken: string;

  statut: Statut;

  roles: Role[];
}

// To protect routes
// export type CreateUser = Omit<CreateUserDto, "statut" | ....>
