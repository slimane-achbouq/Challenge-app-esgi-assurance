// guards/roles.guard.ts
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProfileValidationGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authorization = context.switchToHttp().getRequest().headers[
      'authorization'
    ];
    const CurrentToken = authorization.replace('Bearer ', '');

    const bearerToken = CurrentToken;

    if (!bearerToken) {
      return false;
    }

    let decoded;

    try {
      decoded = this.jwtService.verify(bearerToken);
    } catch (error) {
      throw new Error(error);
    }

    if (decoded.profileStatus) {
      return true;
    }
    return false;
  }
}
