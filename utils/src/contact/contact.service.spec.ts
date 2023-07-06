import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ContactService } from './contact.service';
import { MessageFormDto } from './dto/message-form.dto';
import { MessageForm } from './shema/message-form.shema';

describe('ContactService', () => {
  let contactService: ContactService;
  let messageContactModelMock: any;

  beforeEach(async () => {
    messageContactModelMock = {
      constructor: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: getModelToken(MessageForm.name),
          useValue: messageContactModelMock,
        },
      ],
    }).compile();

    contactService = module.get<ContactService>(ContactService);
  });

  describe('getAllMessages', () => {
    it('should return an array of messages', async () => {
      const messages = [
        {
          id: '1',
          email: 'john@example.com',
          firstname: 'John',
          lastname: 'Doe',
          object: 'Hello',
          message: 'This is a test message.',
        },
        {
          id: '2',
          email: 'jane@example.com',
          firstname: 'Jane',
          lastname: 'Smith',
          object: 'Inquiry',
          message: 'I have a question about your services.',
        },
      ];

      messageContactModelMock.find.mockResolvedValueOnce(messages);

      const result = await contactService.getAllMessages();

      expect(result).toEqual(messages);
      expect(messageContactModelMock.find).toHaveBeenCalled();
    });
  });
});
