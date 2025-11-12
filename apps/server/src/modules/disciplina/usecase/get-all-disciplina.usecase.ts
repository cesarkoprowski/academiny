import { Inject, Injectable } from '@nestjs/common';
import Disciplina from 'common/entities/disciplina/disciplina.entity';
import DisciplinaRepository from 'infra/repository/disciplina.repository.imp';

@Injectable()
export default class GetAllDisciplinaUC {
  constructor(
    @Inject(DisciplinaRepository)
    private readonly disciplinaRepository: DisciplinaRepository,
  ) {}

  async execute(): Promise<Disciplina[]> {
    return await this.disciplinaRepository.getAll();
  }
}
