import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import CursoRepository from 'infra/repository/curso.repository.imp';
import type ICursoRepository from '../repository/curso.repository';
import GetAllCursosResponseDto from '../dto/response/get-all-cursos.response.dto';

@Injectable()
export default class GetAllCursosUC
  implements IUseCase<void, GetAllCursosResponseDto[]>
{
  constructor(
    @Inject(CursoRepository)
    private readonly cursoRepository: ICursoRepository,
  ) {}

  async execute(): Promise<GetAllCursosResponseDto[]> {
    const cursos = await this.cursoRepository.getAll();

    return cursos.map((curso) => ({
      id: curso.id,
      nome: curso.nome,
      modalidade: curso.modalidade,
      turno: curso.turno,
      vagas: curso.vagas,
      cargaHorariaExtensao: curso.cargaHorariaExtensao,
    }));
  }
}
