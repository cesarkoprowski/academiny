import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import DisciplinaRepository from 'infra/repository/disciplina.repository.imp';
import type IDisciplinaRepository from '../repository/disciplina.repository';

@Injectable()
export default class DisciplinaDeleteUC implements IUseCase<number, void> {
  constructor(
    @Inject(DisciplinaRepository)
    private readonly disciplinaRepository: IDisciplinaRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const disciplina = await this.disciplinaRepository.getById(id);

    if (!disciplina) {
      throw new NotFoundException(`Disciplina com ID ${id} não encontrada`);
    }

    await this.disciplinaRepository.delete(id);
  }
}
