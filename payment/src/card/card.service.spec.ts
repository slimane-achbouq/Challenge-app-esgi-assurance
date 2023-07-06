import { Model } from 'mongoose';
import { CardService } from './card.service';
import { CreateCreditCardDto } from '../dto/create-credit-card.dto';
import { CreditCard } from '../schema/credit-card.shema';

describe('CardService', () => {
  let cardService: CardService;
  let creditCardRepository: Model<CreditCard>;

  beforeEach(() => {
    creditCardRepository = {
      findOne: jest.fn(),
      findByIdAndDelete: jest.fn(),
      create: jest.fn(),
    } as unknown as Model<CreditCard>;

    cardService = new CardService(creditCardRepository);
  });

  describe('createCreditCard', () => {
    it('should return an error message if user already has a card', async () => {
      // Arrange
      const createCreditCardDto: CreateCreditCardDto = {
        cardNumber: '4444 4444 4444 5555',
        expiryDate: '12/23',
        cvc: 123,
        cardName: 'Zakaria ATTAOUI',
        userEmail: 'attaouizakaria98@gmail.com',
      };

      jest.spyOn(cardService, 'findByUserByEmail').mockResolvedValue({
        message: 'Some message',
      });

      // Act
      const result = await cardService.createCreditCard(createCreditCardDto);

      expect(result).toEqual({
        message: 'You have already a card in our database !',
      });
      expect(creditCardRepository.create).not.toHaveBeenCalled();
    });

    // it('should save and return the created credit card', async () => {
    //   const createCreditCardDto: CreateCreditCardDto = {
    //     cardNumber: '4444 4444 4444 5555',
    //     expiryDate: '12/23',
    //     cvc: 123,
    //     cardName: 'Zakaria ATTAOUI',
    //     userEmail: 'attaouizakaria98@gmail.com',
    //   };

    //   jest.spyOn(cardService, 'findByUserByEmail').mockResolvedValue({
    //     message: 'this user does not have a card !',
    //   });

    //   const createdCreditCard: any = {
    //     cardNumber: '4444 4444 4444 5555',
    //     expiryDate: '12/23',
    //     cvc: 123,
    //     cardName: 'Zakaria ATTAOUI',
    //     userEmail: 'attaouizakaria98@gmail.com',
    //   };

    //   jest
    //     .spyOn(creditCardRepository, 'create')
    //     .mockResolvedValue(createdCreditCard);

    //   const result = await cardService.createCreditCard(createCreditCardDto);

    //   expect(result).toEqual(createdCreditCard);
    //   expect(creditCardRepository.create).toHaveBeenCalledWith(
    //     createCreditCardDto,
    //   );
    // });
  });
});
