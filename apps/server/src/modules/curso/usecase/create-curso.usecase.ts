import { IUseCase } from 'common/interface/use-case.interface';
import CursoRequestCreateDto from '../dto/request/curso-create.request.dto';
import CursoResponseCreateDto from '../dto/response/curso-create.response.dto';
import { Inject, Injectable } from '@nestjs/common';
import CursoRepository from 'infra/repository/curso.repository.imp';

@Injectable()
export default class CreateCursoUC
  implements IUseCase<CursoRequestCreateDto, CursoResponseCreateDto>
{
  constructor(
    @Inject(CursoRepository)
    private readonly respository: CursoRepository,
  ) {}
  async execute(input: CursoRequestCreateDto): Promise<CursoResponseCreateDto> {
    const newCurso = await this.respository.create(input);

    const cursoResponseCreate = {
      cargaHorariaExtensao: newCurso.cargaHorariaExtensao,
      id: newCurso.id,
      modalidade: newCurso.modalidade,
      nome: newCurso.nome,
      vagas: newCurso.vagas,
      turno: newCurso.turno,
    };

    return cursoResponseCreate;
  }
}
