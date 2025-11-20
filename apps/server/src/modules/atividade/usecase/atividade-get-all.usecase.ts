import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import AtividadeExtensaoRepository from 'infra/repository/atividade.repository.imp';
import type IAtividadeExtensaoRepository from 'modules/atividade/repository/atividade.repository';
import AtividadeExtensaoCreateResponseDto from '../dto/response/atividade-create.response.dto';

@Injectable()
export default class AtividadeExtensaoGetAllUC
  implements IUseCase<void, AtividadeExtensaoCreateResponseDto[]>
{
  constructor(
    @Inject(AtividadeExtensaoRepository)
    private readonly atividadeExtensaoRepository: IAtividadeExtensaoRepository,
  ) {}

  async execute(): Promise<AtividadeExtensaoCreateResponseDto[]> {
    const atividades = await this.atividadeExtensaoRepository.getAll();

    return atividades.map((atividade) => ({
      id: atividade.id,
      titulo: atividade.titulo,
      descricao: atividade.descricao,
      cargaHoraria: atividade.cargaHoraria,
    }));
  }
}
