import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import AtividadeExtensaoRepository from 'infra/repository/atividade.repository.imp';
import type IAtividadeExtensaoRepository from 'modules/atividade/repository/atividade.repository';
import AtividadeExtensaoCreateResponseDto from '../dto/response/atividade-create.response.dto';

@Injectable()
export default class AtividadeExtensaoGetByIdUC
  implements IUseCase<number, AtividadeExtensaoCreateResponseDto>
{
  constructor(
    @Inject(AtividadeExtensaoRepository)
    private readonly atividadeExtensaoRepository: IAtividadeExtensaoRepository,
  ) {}

  async execute(id: number): Promise<AtividadeExtensaoCreateResponseDto> {
    const atividade = await this.atividadeExtensaoRepository.getById(id);

    if (!atividade) {
      throw new NotFoundException(
        `Atividade de extensão com ID ${id} não encontrada`,
      );
    }

    return {
      id: atividade.id,
      titulo: atividade.titulo,
      descricao: atividade.descricao,
      cargaHoraria: atividade.cargaHoraria,
    };
  }
}
