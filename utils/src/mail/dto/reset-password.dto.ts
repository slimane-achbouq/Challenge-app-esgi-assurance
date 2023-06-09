import { ApiPropertyOptions, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

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
  // password: {
  //   required: true,
  //   format: 'string',
  //   example: 'zakaria1998',
  //   description: 'User password',
  // },
};

export class ResetPasswordDto {
  @ApiProperty(apiPropertiesResetPassword.email)
  @IsEmail()
  email: string;

  @ApiProperty(apiPropertiesResetPassword.token)
  @IsString()
  token: string;

  // @ApiProperty(apiPropertiesUpdatePassword.password)
  // @IsString()
  // @MinLength(8)
  // password: string;
}
