import { ApiPropertyOptions } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export const apiPropertiesUser: {
  [P in keyof Partial<VerifyDto>]: ApiPropertyOptions;
} = {
  email: {
    required: true,
    format: 'string',
    example: 'zakaria@gmail.com',
    description: 'User Email',
  },
  token: {
    required: true,
    format: 'string',
    example: 'qdqjhsgdjqhsgd54SD625D2D2',
    description: 'Validation token profile',
  },
};
export class VerifyDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
