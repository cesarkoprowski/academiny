import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import CursoRepository from 'infra/repository/curso.repository.imp';
import type ICursoRepository from '../repository/curso.repository';

@Injectable()
export default class DeleteCursoUC implements IUseCase<number, void> {
  constructor(
    @Inject(CursoRepository)
    private readonly cursoRepository: ICursoRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const curso = await this.cursoRepository.getById(id);

    if (!curso) {
      throw new NotFoundException('Curso não encontrado');
    }

    await this.cursoRepository.delete(id);
  }
}
