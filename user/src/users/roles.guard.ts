import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './enums/roles.enum';
import { UsersService } from './users.service';
import * as argon2 from 'argon2';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly userService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const authorization = context.switchToHttp().getRequest().headers['authorization'];
    const CurrentToken = authorization.replace('Bearer ', '');

    const user = await (await this.userService.userModel.findOne({ accessToken: CurrentToken }));

    if (!requireRoles) {
      return true;
    }
    return requireRoles.some((role) => user.roles?.includes(role));
  }
}
