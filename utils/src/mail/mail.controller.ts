import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Mail')
@Controller({
  path: 'mail',
})
export class MailController {}
