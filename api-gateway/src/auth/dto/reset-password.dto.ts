import { ApiPropertyOptions, ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export const apiPropertiesUpdatePassword: {
  [P in keyof Partial<ResetPasswordDto>]: ApiPropertyOptions;
} = {
  email: {
    required: true,
    format: 'string',
    example: 'zakaria@gmail.com',
    description: 'User token to update email',
  },
};

export class ResetPasswordDto {
  @ApiProperty(apiPropertiesUpdatePassword.email)
  @IsEmail()
  email: string;
}
