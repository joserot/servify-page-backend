import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuardGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const getRolMeta = this.reflector.get<string[]>(
      'rol',
      context.getHandler(),
    );

    const req = context.getArgByIndex(0);
    const { roles } = req.user;

    const isAllow = roles.some((rol) => roles.includes('admin'));
    return isAllow;
  }
}
