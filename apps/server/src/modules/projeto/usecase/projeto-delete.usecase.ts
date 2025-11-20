import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import ProjetoExtensaoRepository from 'infra/repository/projeto.repository.imp';
import type IProjetoExtensaoRepository from '../repository/projeto.repository';
import AlunoProjetoRepository from 'infra/repository/aluno-projeto.repository.imp';

@Injectable()
export default class ProjetoExtensaoDeleteUC
  implements IUseCase<{ id: number; alunoId: number }, void>
{
  constructor(
    @Inject(ProjetoExtensaoRepository)
    private readonly projetoExtensaoRepository: IProjetoExtensaoRepository,
    @Inject(AlunoProjetoRepository)
    private readonly alunoProjetoRepository: AlunoProjetoRepository,
  ) {}

  async execute(params: { id: number; alunoId: number }): Promise<void> {
    const alunoProjetoRelation =
      await this.alunoProjetoRepository.findByAlunoAndProjeto(
        params.alunoId,
        params.id,
      );

    if (!alunoProjetoRelation) {
      throw new ForbiddenException(
        'Você não tem permissão para deletar este projeto. Apenas o aluno que criou o projeto pode deletá-lo.',
      );
    }

    const projeto = await this.projetoExtensaoRepository.getById(params.id);

    if (!projeto) {
      throw new NotFoundException(
        `Projeto de extensão com ID ${params.id} não encontrado`,
      );
    }

    await this.projetoExtensaoRepository.delete(params.id);
  }
}
