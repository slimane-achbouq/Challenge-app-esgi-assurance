// auth.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}


  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userServiceClient
      .send({ cmd: 'singIn' }, { username, password })
      .toPromise();

    if (!user) {
      throw new RpcException('User not found');
    }
    return user;
  }


  async login(username: string, password: string) {
    const response = await this.userServiceClient
      .send({ cmd: 'singIn' }, { username, password })
      .toPromise();
    console.log(response)
    return response;
  }


}
