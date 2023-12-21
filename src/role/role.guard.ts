import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { IS_PUBLIC_KEY } from 'src/auth/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authGuard: AuthGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = await this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const baseGuardResult = await this.authGuard.canActivate(context);
    if (!baseGuardResult) {
      // unsuccessful authentication return false
      return false;
    }
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const contextHttp = context.switchToHttp().getRequest();
    const { user } = contextHttp;
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
