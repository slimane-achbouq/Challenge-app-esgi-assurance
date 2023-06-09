import { ApiPropertyOptions, ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export const apiPropertiesUpdatePassword: {
  [P in keyof Partial<updatePasswordDto>]: ApiPropertyOptions;
} = {
  token: {
    required: true,
    format: 'string',
    example: 'zsmdj-sl45D-FFZFK-Z4fsd-fssd',
    description: 'User token to update email',
  },
  password: {
    required: true,
    format: 'string',
    example: 'zakaria1998',
    description: 'User password',
  },
};

export class updatePasswordDto {
  @ApiProperty(apiPropertiesUpdatePassword.token)
  @IsString()
  token: string;

  @ApiProperty(apiPropertiesUpdatePassword.password)
  @IsString()
  @MinLength(8)
  password: string;
}
