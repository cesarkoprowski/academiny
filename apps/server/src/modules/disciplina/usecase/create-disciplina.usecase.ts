import { IUseCase } from 'common/interface/use-case.interface';
import { Inject, Injectable } from '@nestjs/common';
import DisciplinaCreateRequestDto from '../dto/request/disciplina-create.request.dto';
import DisciplinaCreateResponseDto from '../dto/response/disciplina-create.response.dto';
import DisciplinaRepository from 'infra/repository/disciplina.repository.imp';

@Injectable()
export default class CreateDisciplinaUC implements IUseCase<DisciplinaCreateRequestDto, DisciplinaCreateResponseDto> {
  constructor(
    @Inject(DisciplinaRepository)
    private readonly repository: DisciplinaRepository,
  ) { }
  async execute(input: DisciplinaCreateRequestDto): Promise<DisciplinaCreateResponseDto> {
    const newDisciplina = await this.repository.create(input);

    const disciplinaResponseCreate = {
      id: newDisciplina.id,
      nome: newDisciplina.nome,
      codigo: newDisciplina.codigo,
      cargaHorariaExtensao: newDisciplina.cargaHorariaExtensao,
    };

    return disciplinaResponseCreate;
  }
}
