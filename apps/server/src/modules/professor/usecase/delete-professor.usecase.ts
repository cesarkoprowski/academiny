import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import ProfessorRepository from 'infra/repository/professor.repository.imp';
import type IProfessorRepository from 'modules/professor/repository/professor.repository';
import UserRepository from 'infra/repository/user.repository.imp';
import type IUserRepository from 'modules/user/repository/user.repository';

@Injectable()
export default class DeleteProfessorUC implements IUseCase<number, void> {
  constructor(
    @Inject(ProfessorRepository)
    private readonly professorRepository: IProfessorRepository,
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const professor = await this.professorRepository.getById(id);

    if (!professor) {
      throw new NotFoundException('Professor não encontrado.');
    }

    const deleted = await this.professorRepository.delete(id);

    if (!deleted) {
      throw new NotFoundException('Erro ao deletar professor.');
    }
  }
}
