import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import DisciplinaRepository from 'infra/repository/disciplina.repository.imp';
import type IDisciplinaRepository from '../repository/disciplina.repository';
import DisciplinaCreateResponseDto from '../dto/response/disciplina-create.response.dto';

@Injectable()
export default class GetAllDisciplinaUC
  implements IUseCase<void, DisciplinaCreateResponseDto[]>
{
  constructor(
    @Inject(DisciplinaRepository)
    private readonly disciplinaRepository: IDisciplinaRepository,
  ) {}

  async execute(): Promise<DisciplinaCreateResponseDto[]> {
    const disciplinas = await this.disciplinaRepository.getAll();

    return disciplinas.map((disciplina) => ({
      id: disciplina.id,
      nome: disciplina.nome,
      codigo: disciplina.codigo,
      cargaHorariaExtensao: disciplina.cargaHorariaExtensao,
    }));
  }
}
