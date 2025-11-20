import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import AtividadeExtensaoRepository from 'infra/repository/atividade.repository.imp';
import type IAtividadeExtensaoRepository from 'modules/atividade/repository/atividade.repository';
import AtividadeExtensaoUpdateRequestDto from '../dto/request/atividade-update.request.dto';

@Injectable()
export default class AtividadeExtensaoUpdateUC
  implements
    IUseCase<{ id: number; input: AtividadeExtensaoUpdateRequestDto }, void>
{
  constructor(
    @Inject(AtividadeExtensaoRepository)
    private readonly atividadeExtensaoRepository: IAtividadeExtensaoRepository,
  ) {}

  async execute(params: {
    id: number;
    input: AtividadeExtensaoUpdateRequestDto;
  }): Promise<void> {
    const atividade = await this.atividadeExtensaoRepository.update(
      params.id,
      params.input,
    );

    if (!atividade) {
      throw new NotFoundException(
        `Atividade de extensão com ID ${params.id} não encontrada`,
      );
    }
  }
}
