import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import AlunoRepository from 'infra/repository/aluno.repository.imp';
import type IAlunoRepository from '../repository/aluno.repository';

@Injectable()
export default class DeleteAlunoUC implements IUseCase<number, void> {
  constructor(
    @Inject(AlunoRepository)
    private readonly alunoRepository: IAlunoRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const aluno = await this.alunoRepository.getById(id);

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    await this.alunoRepository.delete(id);
  }
}
