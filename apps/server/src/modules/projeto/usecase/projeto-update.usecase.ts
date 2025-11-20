import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import ProjetoExtensaoRepository from 'infra/repository/projeto.repository.imp';
import type IProjetoExtensaoRepository from '../repository/projeto.repository';
import ProjetoExtensaoUpdateRequestDto from '../dto/request/projeto-update.request.dto';
import ProjetoExtensao from 'common/entities/projeto/projeto.entity';
import AtividadeExtensao from 'common/entities/atividade/atividade.entity';
import Professor from 'common/entities/professor/professor.entity';
import AlunoProjetoRepository from 'infra/repository/aluno-projeto.repository.imp';

@Injectable()
export default class ProjetoExtensaoUpdateUC
  implements
    IUseCase<
      { id: number; input: ProjetoExtensaoUpdateRequestDto; alunoId: number },
      void
    >
{
  constructor(
    @Inject(ProjetoExtensaoRepository)
    private readonly projetoExtensaoRepository: IProjetoExtensaoRepository,
    @Inject(AlunoProjetoRepository)
    private readonly alunoProjetoRepository: AlunoProjetoRepository,
  ) {}

  async execute(params: {
    id: number;
    input: ProjetoExtensaoUpdateRequestDto;
    alunoId: number;
  }): Promise<void> {
    const alunoProjetoRelation =
      await this.alunoProjetoRepository.findByAlunoAndProjeto(
        params.alunoId,
        params.id,
      );

    if (!alunoProjetoRelation) {
      throw new ForbiddenException(
        'Você não tem permissão para atualizar este projeto. Apenas o aluno que criou o projeto pode atualizá-lo.',
      );
    }

    const updateData: Partial<ProjetoExtensao> = {
      ...(params.input.nome && { nome: params.input.nome }),
      ...(params.input.resumo && { resumo: params.input.resumo }),
      ...(params.input.urlAnexo && { urlAnexo: params.input.urlAnexo }),
      ...(params.input.feedbackProfessor && {
        feedbackProfessor: params.input.feedbackProfessor,
      }),
      ...(params.input.atividadeExtensaoId && {
        atividadeExtensao: {
          id: params.input.atividadeExtensaoId,
        } as AtividadeExtensao,
      }),
      ...(params.input.professorAvaliadorId && {
        professorAvaliadorId: {
          id: params.input.professorAvaliadorId,
        } as Professor,
      }),
    };

    const projeto = await this.projetoExtensaoRepository.update(
      params.id,
      updateData,
    );

    if (!projeto) {
      throw new NotFoundException(
        `Projeto de extensão com ID ${params.id} não encontrado`,
      );
    }
  }
}
