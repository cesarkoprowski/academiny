/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';

import { Request } from 'express';
import { UserJwt } from './type/user-jwt.type';
import Coordenador from 'common/entities/coordenador/coordenador.entity';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';

@Injectable()
export default class AuthGuardCoordinator implements CanActivate {
  constructor(
    @Inject(CoordinatorRepository)
    private accountService: CoordinatorRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user: UserJwt = request['x-user'];

    const coordinator: Coordenador | null = await this.accountService.getById(
      user.id,
    );

    if (coordinator) return true;

    return false;
  }
}
