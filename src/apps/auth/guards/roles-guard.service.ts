import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RoleName } from 'src/apps/role/enum/roles.enum';


@Injectable()
export class RolesGuard {
  canActivate(context: ExecutionContext, roles: RoleName[]): boolean {
    const {
      user: { role: userRole },
    } = context.switchToHttp().getRequest();

    const hasValidRole = this.hasValidRole(userRole, roles);

    if (!hasValidRole) {
      throw new ForbiddenException("Route is unavailable for this user's role");
    }

    return hasValidRole;
  }

  private hasValidRole(userRole: RoleName, roles: RoleName[]) {
    return roles.includes(userRole);
  }
}
