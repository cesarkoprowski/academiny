import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import AlunoRepository from 'infra/repository/aluno.repository.imp';
import type IAlunoRepository from '../repository/aluno.repository';
import UpdateAlunoRequestDto from '../dto/request/update-aluno.request.dto';

interface UpdateAlunoInput {
  id: number;
  data: UpdateAlunoRequestDto;
}

@Injectable()
export default class UpdateAlunoUC implements IUseCase<UpdateAlunoInput, void> {
  constructor(
    @Inject(AlunoRepository)
    private readonly alunoRepository: IAlunoRepository,
  ) {}

  async execute(input: UpdateAlunoInput): Promise<void> {
    const aluno = await this.alunoRepository.getById(input.id);

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    await this.alunoRepository.update(input.id, {
      matricula: input.data.matricula,
      cursoId: input.data.cursoId,
    });
  }
}
