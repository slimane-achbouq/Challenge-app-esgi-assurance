import {
    CanActivate,
    ExecutionContext,
    Injectable,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { RpcException } from '@nestjs/microservices';
  
  @Injectable()
export class RabbitMQAccessTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const data = context.getArgByIndex(0);
    console.log(data)
    const bearerToken = data.accessToken; 

    if (!bearerToken) {
      throw new RpcException('Unauthorized');
    }

    const token = bearerToken.split(' ')[1];


    if (!token) {
      throw new RpcException('Unauthorized');
    }

    try {
      const decoded = this.jwtService.verify(token);
      context.switchToHttp().getRequest().user = decoded;
      return !!decoded;
    } catch (e) {
      throw new RpcException('Unauthorized');
    }
  }
}
  