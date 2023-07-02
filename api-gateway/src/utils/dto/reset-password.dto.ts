import { ApiPropertyOptions, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export const apiPropertiesResetPassword: {
  [P in keyof Partial<ResetPasswordDto>]: ApiPropertyOptions;
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
    example: 'zsmdj-sl45D-FFZFK-Z4fsd-fssd',
    description: 'User token to update email',
  },
};

export class ResetPasswordDto {
  @ApiProperty(apiPropertiesResetPassword.email)
  @IsEmail()
  email: string;

  @ApiProperty(apiPropertiesResetPassword.token)
  @IsString()
  token: string;
}
