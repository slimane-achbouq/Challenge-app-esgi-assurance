import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findByUserByEmail(createUserDto.email);

    if (user) {
      throw new BadRequestException(
        'You have already a compte in our database !',
      );
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User | undefined> {
    const user: User = await this.userModel.findById(id);

    if (!user.isValide)
      throw new BadRequestException(`User profile is not activated !`);

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

    return this.userModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
