// guards/roles.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {

   
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const data = context.getArgByIndex(0);
    const bearerToken = data.accessToken;

    if (!bearerToken) {
      return false;
    }

    const token = bearerToken.split(' ')[1];
    let decoded;

    try {
      decoded = this.jwtService.verify(token);
      
    } catch (e) {
      return false;
    }

    return requiredRoles.some((role) => decoded.roles?.includes(role))
    
   
  }
}
