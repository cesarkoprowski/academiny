/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_ADMIN_KEY } from 'common/decorators/public.decorator';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserJwt } from './type/user-jwt.type';

@Injectable()
export default class AuthGuardAdmin implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const requestRoutePath: string = request.originalUrl;

    if (!requestRoutePath.includes('admin')) return true;

    const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!isAdmin) return true;

    const user: UserJwt = request['x-user'];

    return user?.isAdmin === true;
  }
}
