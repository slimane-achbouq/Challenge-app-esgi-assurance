import { ApiPropertyOptions, ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export const apiPropertiesUpdatePassword: {
  [P in keyof Partial<resetPasswordDto>]: ApiPropertyOptions;
} = {
  email: {
    required: true,
    format: 'string',
    example: 'zakaria@gmail.com',
    description: 'User token to update email',
  },
};

export class resetPasswordDto {
  @ApiProperty(apiPropertiesUpdatePassword.email)
  @IsEmail()
  email: string;
}
