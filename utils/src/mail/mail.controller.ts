import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { VerifyDto } from './dto/verify-profile.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

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
}
