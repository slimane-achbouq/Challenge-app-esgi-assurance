import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CreditCard, CreditCardShema } from 'src/schema/credit-card.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CreditCard.name, schema: CreditCardShema },
    ]),
  ],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
