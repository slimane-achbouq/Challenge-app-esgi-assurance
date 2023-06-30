import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCreditCardDto } from 'src/dto/create-credit-card.dto';
import { CreditCard } from 'src/schema/credit-card.shema';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(CreditCard.name)
    readonly creditCardRepository: Model<CreditCard>,
  ) {}

  async createCreditCard(createCreditCardDto: CreateCreditCardDto) {
    const creditCard: any = await this.findByUserByEmail(
      createCreditCardDto.userEmail,
    );

    if (creditCard.message !== 'this user does not have a card !') {
      return {
        message: 'You have already an card in our database !',
      };
    }

    const createdCreditCard = new this.creditCardRepository(
      createCreditCardDto,
    );
    return createdCreditCard.save();
  }

  async findByUserByEmail(email: string) {
    const userEmail = email;
    const creditCard: CreditCard = await this.creditCardRepository
      .findOne({ userEmail })
      .exec();

    if (!creditCard) {
      return {
        message: 'this user does not have a card !',
      };
    }
    return creditCard;
  }

  async deleteCreditCardByEmail(email: string) {
    const creditCard: any = await this.findByUserByEmail(email);

    if (creditCard.message !== 'this user does not have a card !') {
      this.creditCardRepository.findByIdAndDelete(creditCard._id).exec();
    }

    console.log(creditCard);

    return {
      message: 'You have delete credit card with success !',
    };
  }
}
