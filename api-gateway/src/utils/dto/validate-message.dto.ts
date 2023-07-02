import { ApiPropertyOptions, ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export const apiPropertiesMessageForm: {
  [P in keyof Partial<ValidateMessageDto>]: ApiPropertyOptions;
} = {
  _id: {
    required: true,
    format: 'string',
    example: '23123DF5FF5FZE435',
    description: 'User id',
  },
};

export class ValidateMessageDto {
  @ApiProperty(apiPropertiesMessageForm._id)
  @IsString()
  _id: string;
}
