import Aluno from 'common/entities/aluno/aluno.entity';
import GuardEntityBase from '../base/auth-entity-base.guard';
import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import AlunoRepository from 'infra/repository/aluno.repository.imp';

@Injectable()
export default class AuthGuardAluno extends GuardEntityBase<Aluno> {
  constructor(
    @Inject(Aluno)
    accountService: AlunoRepository,
  ) {
    super(accountService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await super.canActivate(context);
  }
}
