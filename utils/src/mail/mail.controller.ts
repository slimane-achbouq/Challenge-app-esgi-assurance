import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { VerifyDto } from './dto/verify-profile.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@ApiTags('Mail')
@Controller({
  path: 'mail',
})
export class MailController {
  constructor(private readonly maileService: MailService) {}

  @Post('singInConfirmationEmail')
  sendMailtoValidateUser(@Body() veridyDto: VerifyDto) {
    return this.maileService.sendMailtoValidateUser(veridyDto);
  }
}
