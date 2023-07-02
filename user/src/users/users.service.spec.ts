import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Statut } from './enums/statut.enum';
import { Role } from './enums/roles.enum';

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            prototype: {
              save: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('create', () => {
    it('should create a new user', async () => {
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
        isValide: true,
        refreshToken: '',
        validationToken: '',
        statut: Statut.Inactif,
        roles: [Role.USER],
      };

      // Mock the findByUserByEmail method to return null,
      // indicating that the user does not exist
      jest.spyOn(usersService, 'findByUserByEmail').mockResolvedValue(null);

      // Mock the save method to return the created user
      const createdUser = new User();
      jest.spyOn(userModel.prototype, 'save').mockResolvedValue(createdUser);

      // Call the create method
      const result = await usersService.create(createUserDto);

      // Assert that the findByUserByEmail method was called with the correct email
      expect(usersService.findByUserByEmail).toHaveBeenCalledWith(
        createUserDto.email,
      );

      // Assert that the save method was called
      expect(userModel.prototype.save).toHaveBeenCalled();

      // Assert that the result matches the created user
      expect(result).toEqual(createdUser);
    });
  });
});
