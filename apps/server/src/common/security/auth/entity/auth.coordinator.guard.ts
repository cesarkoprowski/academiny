import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import Coordenador from 'common/entities/coordenador/coordenador.entity';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';
import GuardEntityBase from '../base/auth-entity-base.guard';

@Injectable()
export default class AuthGuardCoordinator extends GuardEntityBase<Coordenador> {
  constructor(
    @Inject(CoordinatorRepository)
    accountService: CoordinatorRepository,
  ) {
    super(accountService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await super.canActivate(context);
  }
}
