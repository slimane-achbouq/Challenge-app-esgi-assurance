import { Test, TestingModule } from '@nestjs/testing';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { CreateCreditCardDto } from 'src/dto/create-credit-card.dto';

describe('CardController', () => {
  let controller: CardController;
  let service: CardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardController],
      providers: [
        {
          provide: CardService,
          useValue: {
            createCreditCard: jest.fn(),
            findByUserByEmail: jest.fn(),
            deleteCreditCardByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CardController>(CardController);
    service = module.get<CardService>(CardService);
  });

  describe('createCreditCard', () => {
    it('should call cardService.createCreditCard and return the result', async () => {
      const createCreditCardDto: CreateCreditCardDto = {
        cardNumber: '4444 4444 4444 5555',
        expiryDate: '12/23',
        cvc: 123,
        cardName: 'Zakaria ATTAOUI',
        userEmail: 'attaouizakaria98@gmail.com',
      };

      const expectedResult = { message: 'Credit card created successfully' };

      jest.spyOn(service, 'createCreditCard').mockResolvedValue(expectedResult);

      const result = await controller.createCreditCard(createCreditCardDto);

      expect(service.createCreditCard).toHaveBeenCalledWith(
        createCreditCardDto,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findCreditCardByEmail', () => {
    it('should call cardService.findByUserByEmail and return the result', async () => {
      const userEmail = 'test@example.com';

      const expectedResult: any = {
        cardNumber: '4444 4444 4444 5555',
        expiryDate: '12/23',
        cvc: 123,
        cardName: 'Zakaria ATTAOUI',
        userEmail: 'attaouizakaria98@gmail.com',
      };

      jest
        .spyOn(service, 'findByUserByEmail')
        .mockResolvedValue(expectedResult);

      const result = await controller.findCreditCardByEmail(userEmail);

      expect(service.findByUserByEmail).toHaveBeenCalledWith(userEmail);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('deleteCreditCardByEmail', () => {
    it('should call cardService.deleteCreditCardByEmail and return the result', async () => {
      const userEmail = 'test@example.com';

      const expectedResult = {
        message: 'You have delete credit card with success !',
      };

      jest
        .spyOn(service, 'deleteCreditCardByEmail')
        .mockResolvedValue(expectedResult);

      const result = await controller.deleteCreditCardByEmail(userEmail);

      expect(service.deleteCreditCardByEmail).toHaveBeenCalledWith(userEmail);
      expect(result).toEqual(expectedResult);
    });
  });
});
