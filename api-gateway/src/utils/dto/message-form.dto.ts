import { ApiPropertyOptions, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export const apiPropertiesMessageForm: {
  [P in keyof Partial<MessageFormDto>]: ApiPropertyOptions;
} = {
  email: {
    required: true,
    format: 'string',
    example: 'zakaria@gmail.com',
    description: 'User Email',
  },
  firstname: {
    required: true,
    format: 'string',
    example: 'Zaid',
    description: 'User firstname',
  },
  lastname: {
    required: true,
    format: 'string',
    example: 'ALAA-HAZIM',
    description: 'User lastname',
  },
  object: {
    required: true,
    format: 'string',
    example: 'Problem to sign in',
    description: 'object description',
  },
  message: {
    required: true,
    format: 'string',
    example: 'Bonjour ...',
    description: 'User message',
  },
};

export class MessageFormDto {
  @ApiProperty(apiPropertiesMessageForm.email)
  @IsEmail()
  email: string;

  @ApiProperty(apiPropertiesMessageForm.firstname)
  @IsString()
  firstname: string;

  @ApiProperty(apiPropertiesMessageForm.lastname)
  @IsString()
  lastname: string;

  @ApiProperty(apiPropertiesMessageForm.object)
  @IsString()
  object: string;

  @ApiProperty(apiPropertiesMessageForm.message)
  message: string;
}
