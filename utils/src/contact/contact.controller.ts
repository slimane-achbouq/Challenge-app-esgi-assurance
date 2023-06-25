import { Controller } from '@nestjs/common';
import { ContactService } from './contact.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessageFormDto } from './dto/message-form.dto';
import { ValidateMessageDto } from './dto/validate-message.dto';

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

  @MessagePattern({ cmd: 'getAllMessages' })
  getAllMessages() {
    try {
      return this.conractService.getAllMessages();
    } catch (error) {
      return error.message;
    }
  }

  @MessagePattern({ cmd: 'validateMessage' })
  validateMessage(@Payload() validateMessageDto: ValidateMessageDto) {
    try {
      return this.conractService.validateMessage(validateMessageDto._id);
    } catch (error) {
      return error.message;
    }
  }
}
