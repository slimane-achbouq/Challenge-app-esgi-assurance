import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Statut } from './enums/statut.enum';
import { Role } from './enums/roles.enum';
import { BadRequestException } from '@nestjs/common';

type mockModel<T = any> = Partial<Record<keyof Model<T>, jest.Mock>>;
const createMockModel = <T = any>(): mockModel<T> => ({
  findById: jest.fn(),
  create: jest.fn(),
});

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: createMockModel(),
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should throw a BadRequestException when the email is already in use', async () => {
      const createUserDto: CreateUserDto = {
        firstname: 'Zakaria',
        lastname: 'ATTAOUI',
        email: 'zakaria@gmail.com',
        adresse: '8 impasse de la chapelle',
        city: 'PARIS',
        codeCity: 75018,
        phoneNumber: 33749380088,
        password: 'zakaria1998',
        age: 23,
        isValide: false,
        refreshToken: '',
        validationToken: '',
        statut: Statut.Inactif,
        roles: [Role.USER],
      };

      jest
        .spyOn(usersService, 'findByUserByEmail')
        .mockResolvedValueOnce({} as User);

      await expect(usersService.create(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
