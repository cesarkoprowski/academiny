import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import AtividadeExtensaoRepository from 'infra/repository/atividade.repository.imp';
import type IAtividadeExtensaoRepository from 'modules/atividade/repository/atividade.repository';

@Injectable()
export default class AtividadeExtensaoDeleteUC
  implements IUseCase<number, void>
{
  constructor(
    @Inject(AtividadeExtensaoRepository)
    private readonly atividadeExtensaoRepository: IAtividadeExtensaoRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const atividade = await this.atividadeExtensaoRepository.getById(id);

    if (!atividade) {
      throw new NotFoundException(
        `Atividade de extensão com ID ${id} não encontrada`,
      );
    }

    await this.atividadeExtensaoRepository.delete(id);
  }
}
