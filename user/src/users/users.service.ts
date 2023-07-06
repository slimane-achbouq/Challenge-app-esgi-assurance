import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  private logger = null;

  constructor(@InjectModel(User.name) readonly userModel: Model<User>) {
    this.logger = WinstonModule.createLogger({
      transports: [
        new transports.File({
          level: 'debug',
          filename: 'logs/debug.log',
          format: format.combine(format.timestamp(), format.json()),
        }),
        new transports.File({
          level: 'error',
          filename: 'logs/error.log',
          format: format.combine(format.timestamp(), format.json()),
        }),
        new transports.Console({
          format: format.combine(format.colorize({ message: true })),
        }),
      ],
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findByUserByEmail(createUserDto.email);

    if (user) {
      this.logger.error(
        'createUser attempt : user ' +
          user.email +
          ' already exists in database',
      );
      throw new BadRequestException(
        'You have already an account in our database !',
      );
    }

    const createdUser = new this.userModel(createUserDto);
    this.logger.debug(
      'debug',
      'createUser : new user ' + createUserDto.email + ' created',
    );
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User | undefined> {
    const user: User = await this.userModel.findById(id);

    if (!user.isValide) {
      this.logger.error(
        'findById attempt : user account ' + user.email + ' is not activated',
      );
      throw new BadRequestException(`User profile is not activated !`);
    }
    return user;
  }

  // TDOD: verify is user profile is valide
  async findByUserByEmail(email: string): Promise<User> {
    const user: User = await this.userModel.findOne({ email }).exec();
    return user;
  }

  async findByUserBytoken(validationToken: string): Promise<User> {
    const user: User = await this.userModel.findOne({ validationToken }).exec();
    return user;
  }

  // TDOD: verify is user profile is valide
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Fetch existing data
    const existingUser = await this.userModel.findById(id).exec();

    if (!existingUser) {
      this.logger.error(
        'updateuser attempt : user with ID ' + id + ' not found',
      );
      throw new NotFoundException(`User not found with id: ${id}`);
    }

    // Update only the fields that have changed
    const update: any = {};

    Object.keys(updateUserDto).forEach((key) => {
      if (existingUser[key] !== updateUserDto[key]) {
        console.log(updateUserDto[key]);
        update[key] = updateUserDto[key];
      }
    });

    this.logger.debug('debug', 'updateuser : user with ID ' + id + ' updated');
    return this.userModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async remove(id: string): Promise<User> {
    this.logger.debug('debug', 'removeUser : user with ID ' + id + ' deleted');
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
