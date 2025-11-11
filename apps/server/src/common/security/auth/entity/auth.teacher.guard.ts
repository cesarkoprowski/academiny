import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import GuardEntityBase from '../base/auth-entity-base.guard';
import Professor from 'common/entities/professor/professor.entity';
import ProfessorRepository from 'infra/repository/professor.repository.imp';

@Injectable()
export default class AuthGuardTeacher extends GuardEntityBase<Professor> {
  constructor(
    @Inject(ProfessorRepository)
    accountService: ProfessorRepository,
  ) {
    super(accountService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await super.canActivate(context);
  }
}
