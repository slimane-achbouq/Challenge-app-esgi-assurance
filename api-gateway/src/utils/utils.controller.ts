import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { VerifyDto } from './dto/verify-profile.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

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

  @ApiOkResponse({
    description: 'Send email for update password',
    type: ResetPasswordDto,
  })
  @ApiBody({
    description: 'Send email for update password',
    required: true,
    type: ResetPasswordDto,
  })
  @Post('resetPassword')
  async sendMailResetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.utilsService
      .send({ cmd: 'resetPasswordEmail' }, resetPasswordDto)
      .toPromise();
  }
}
