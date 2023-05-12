import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { VerifyDto } from './dto/verify-profile.dto';

@ApiTags('Mail')
@Controller({
  path: 'mail',
})
export class UtilsController {
  constructor(
    @Inject('UTILS_SERVICE') private readonly utilsService: ClientProxy,
  ) {}

  @Post('singInConfirmationEmail')
  async sendMail(@Body() mailDto: VerifyDto) {
    return this.utilsService
      .send({ cmd: 'singInConfirmationEmail' }, mailDto)
      .toPromise();
  }
}
