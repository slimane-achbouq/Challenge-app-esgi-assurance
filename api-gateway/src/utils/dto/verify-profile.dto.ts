import { ApiPropertyOptions } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export const apiPropertiesUser: {
  [P in keyof Partial<VerifyDto>]: ApiPropertyOptions;
} = {
  token: {
    required: true,
    format: 'string',
    example: 'qdqjhsgdjqhsgd54SD625D2D2',
    description: 'Validation token profile',
  },
};
export class VerifyDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
