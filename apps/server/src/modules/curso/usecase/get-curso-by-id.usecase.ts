import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import CursoRepository from 'infra/repository/curso.repository.imp';
import type ICursoRepository from '../repository/curso.repository';
import GetAllCursosResponseDto from '../dto/response/get-all-cursos.response.dto';

@Injectable()
export default class GetCursoByIdUC
  implements IUseCase<number, GetAllCursosResponseDto>
{
  constructor(
    @Inject(CursoRepository)
    private readonly cursoRepository: ICursoRepository,
  ) {}

  async execute(id: number): Promise<GetAllCursosResponseDto> {
    const curso = await this.cursoRepository.getById(id);

    if (!curso) {
      throw new NotFoundException('Curso não encontrado');
    }

    return {
      id: curso.id,
      nome: curso.nome,
      modalidade: curso.modalidade,
      turno: curso.turno,
      vagas: curso.vagas,
      cargaHorariaExtensao: curso.cargaHorariaExtensao,
    };
  }
}
