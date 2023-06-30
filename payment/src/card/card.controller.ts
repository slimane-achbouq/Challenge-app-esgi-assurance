import { Body, Controller } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCreditCardDto } from 'src/dto/create-credit-card.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @MessagePattern({ cmd: 'createCreditCard' })
  async createCreditCard(@Body() createCreditCardDto: CreateCreditCardDto) {
    return this.cardService.createCreditCard(createCreditCardDto);
  }

  @MessagePattern({ cmd: 'findCreditCardByEmail' })
  async findCreditCardByEmail(@Payload() email) {
    return this.cardService.findByUserByEmail(email);
  }

  @MessagePattern({ cmd: 'deleteCreditCard' })
  async deleteCreditCardByEmail(@Payload() email) {
    return this.cardService.deleteCreditCardByEmail(email);
  }
}
