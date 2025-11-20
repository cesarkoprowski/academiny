import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import DisciplinaRepository from 'infra/repository/disciplina.repository.imp';
import type IDisciplinaRepository from '../repository/disciplina.repository';
import DisciplinaUpdateRequestDto from '../dto/request/disciplina-update.request.dto';

@Injectable()
export default class DisciplinaUpdateUC
  implements IUseCase<{ id: number; input: DisciplinaUpdateRequestDto }, void>
{
  constructor(
    @Inject(DisciplinaRepository)
    private readonly disciplinaRepository: IDisciplinaRepository,
  ) {}

  async execute(params: {
    id: number;
    input: DisciplinaUpdateRequestDto;
  }): Promise<void> {
    const disciplina = await this.disciplinaRepository.update(
      params.id,
      params.input,
    );

    if (!disciplina) {
      throw new NotFoundException(
        `Disciplina com ID ${params.id} não encontrada`,
      );
    }
  }
}
