import {
  ApiProperty,
  ApiPropertyOptions,
} from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export const apiPropertiesAuth: {
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
    example: 's;dhqskdg&1231212H124HG1G4',
    description: 'User token send by email',
  },
};

export class VerifyDto {
  @ApiProperty(apiPropertiesAuth.email)
  @IsEmail()
  email: string;

  @ApiProperty(apiPropertiesAuth.token)
  @IsString()
  @IsNotEmpty()
  token: string;
}
