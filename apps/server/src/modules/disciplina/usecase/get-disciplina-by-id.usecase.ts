import { Inject, Injectable } from '@nestjs/common';
import Disciplina from 'common/entities/disciplina/disciplina.entity';
import DisciplinaRepository from 'infra/repository/disciplina.repository.imp';

@Injectable()
export default class GetDisciplinaByIdUC {
  constructor(
    @Inject(DisciplinaRepository)
    private readonly disciplinaRepository: DisciplinaRepository,
  ) {}

  async execute(id: number): Promise<Disciplina | null> {
    return await this.disciplinaRepository.getById(id);
  }
}
