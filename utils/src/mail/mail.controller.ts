import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { VerifyDto } from './dto/verify-profile.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller({
  path: 'mail',
})
export class MailController {
  constructor(private readonly maileService: MailService) {}

  @MessagePattern({ cmd: 'singInConfirmationEmail' })
  sendMailtoValidateUser(@Payload() veridyDto: VerifyDto) {
    try {
      return this.maileService.sendMailtoValidateUser(veridyDto);
    } catch (error) {
      return error.message;
    }
  }

  @MessagePattern({ cmd: 'resetPasswordEmail' })
  sendMailtoResetPassword(@Payload() resetPasswordDto: ResetPasswordDto) {
    try {
      return this.maileService.sendMailtoResetPassword(resetPasswordDto);
    } catch (error) {
      return error.message;
    }
  }
}
