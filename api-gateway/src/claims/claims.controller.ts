import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Claims')
@Controller({
  path: 'claims',
})
export class ClaimsController {}
