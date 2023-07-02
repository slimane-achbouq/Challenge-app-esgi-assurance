import { Body, Controller, Get, Inject, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { VerifyDto } from './dto/verify-profile.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MessageFormDto } from './dto/message-form.dto';
import { ValidateMessageDto } from './dto/validate-message.dto';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@ApiTags('Utils')
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
    description: 'Send message to Admin',
    type: MessageFormDto,
  })
  @ApiBody({
    description: 'Send message to Admin',
    required: true,
    type: MessageFormDto,
  })
  @Post('createMessageContact')
  async createMessageContact(@Body() messageFormDto: MessageFormDto) {
    return this.utilsService
      .send({ cmd: 'createMessageContact' }, messageFormDto)
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

  @Get('getAllMessages')
  async getAllMessagesOfContact() {
    return this.utilsService.send({ cmd: 'getAllMessages' }, '').toPromise();
  }

  @Put('validateMessage')
  async validateMessage(@Body() validateMessageDto: ValidateMessageDto) {
    return this.utilsService
      .send({ cmd: 'validateMessage' }, validateMessageDto)
      .toPromise();
  }
}
