import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Roles } from 'src/common/guards/roles.decorator';

@ApiTags('user')
@Controller({
  path: 'user',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('Admin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'getUsers' })
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'findUserById' })
  findById(@Payload() id: string) {
    console.log(id);
    return this.usersService.findById(id);
  }

  @ApiBearerAuth()
  @MessagePattern({ cmd: 'updateUser' })
  update(
      @Payload('id') id: string,
      @Payload('updateUserDto') updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @MessagePattern({ cmd: 'deleteUserById' })
  remove(@Payload('id') id) {
    return this.usersService.remove(id);
  }
}