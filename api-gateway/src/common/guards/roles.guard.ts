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

    const authorization = context.switchToHttp().getRequest().headers['authorization'];
    const CurrentToken = authorization.replace('Bearer ', '');
    console.log(CurrentToken)

    const bearerToken = CurrentToken;

    console.log(bearerToken)
    if (!bearerToken) {
      return false;
    }

    let decoded;
    console.log(this.jwtService.verify(bearerToken))
    try {
      decoded = this.jwtService.verify(bearerToken);
      console.log(decoded)
    } catch (e) {
      console.log("error")
      return false;
      
    }


    return requiredRoles.some((role) => decoded.roles?.includes(role))
    
   
  }
}
