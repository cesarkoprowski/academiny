/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Request } from 'express';
import { UserJwt } from '../type/user-jwt.type';
import type { IRepository } from 'common/interface/repository.interface';

@Injectable()
export default class GuardEntityBase<Entity> implements CanActivate {
  constructor(private accountService: IRepository<Entity>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user: UserJwt = request['x-user'];

    if (!user) return false;

    if (user.isAdmin) return true;

    const entity: Entity | null = await this.accountService.getById(
      user.userId,
    );

    if (entity) return true;

    return false;
  }
}
