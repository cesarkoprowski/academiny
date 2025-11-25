import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import CursoRepository from 'infra/repository/curso.repository.imp';
import type ICursoRepository from '../repository/curso.repository';
import GetCursoByIdResponseDto from '../dto/response/get-curso-by-id.response.dto';

@Injectable()
export default class GetCursoByIdUC
  implements IUseCase<number, GetCursoByIdResponseDto>
{
  constructor(
    @Inject(CursoRepository)
    private readonly cursoRepository: ICursoRepository,
  ) {}

  async execute(id: number): Promise<GetCursoByIdResponseDto> {
    const curso = await this.cursoRepository.getById(id);

    if (!curso) {
      throw new NotFoundException('Curso não encontrado');
    }

    return {
      id: curso.id,
      modalidade: curso.modalidade,
      nome: curso.nome,
      turno: curso.turno,
      vagas: curso.vagas,
      cargaHorariaExtensao: curso.cargaHorariaExtensao,
    };
  }
}
