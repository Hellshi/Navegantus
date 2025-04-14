import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RolesGuard } from './roles-guard.service';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class CommonRolesGuard implements CanActivate {
  private rolesGuard = new RolesGuard();

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(ROLES_KEY, context.getHandler());

    if (!roles || !roles.length) {
      return true;
    }

    return this.rolesGuard.canActivate(context, roles);
  }
}
