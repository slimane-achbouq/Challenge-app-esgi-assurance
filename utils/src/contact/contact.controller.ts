import { Controller } from '@nestjs/common';
import { ContactService } from './contact.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessageFormDto } from './dto/message-form.dto';

@Controller({
  path: 'contact',
})
export class ContactController {
  constructor(private readonly conractService: ContactService) {}

  @MessagePattern({ cmd: 'createMessageContact' })
  createMessageContact(@Payload() messageDto: MessageFormDto) {
    try {
      return this.conractService.createMessageContact(messageDto);
    } catch (error) {
      return error.message;
    }
  }
}
