import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import CursoRepository from 'infra/repository/curso.repository.imp';
import type ICursoRepository from '../repository/curso.repository';
import UpdateCursoRequestDto from '../dto/request/update-curso.request.dto';

interface UpdateCursoInput {
  id: number;
  data: UpdateCursoRequestDto;
}

@Injectable()
export default class UpdateCursoUC implements IUseCase<UpdateCursoInput, void> {
  constructor(
    @Inject(CursoRepository)
    private readonly cursoRepository: ICursoRepository,
  ) {}

  async execute(input: UpdateCursoInput): Promise<void> {
    const curso = await this.cursoRepository.getById(input.id);

    if (!curso) {
      throw new NotFoundException('Curso não encontrado');
    }

    await this.cursoRepository.update(input.id, input.data);
  }
}
