import { Inject, Injectable } from '@nestjs/common';
import AlunoProjetoRepository from 'infra/repository/aluno-projeto.repository.imp';
import ProjetoExtensaoRepository from 'infra/repository/projeto.repository.imp';
import GetProjetosResponseDto from '../dto/response/get-projetos.response.dto';

@Injectable()
export default class GetProjetosUC {
  constructor(
    @Inject(AlunoProjetoRepository)
    private readonly alunoProjetoRepository: AlunoProjetoRepository,
    @Inject(ProjetoExtensaoRepository)
    private readonly projetoRepository: ProjetoExtensaoRepository,
  ) {}

  async execute(alunoId: number): Promise<GetProjetosResponseDto[]> {
    const alunoProjetos =
      await this.alunoProjetoRepository.findByAluno(alunoId);

    const projetos = await Promise.all(
      alunoProjetos.map(async (alunoProjeto) => {
        const projeto = await this.projetoRepository.getById(
          alunoProjeto.projetoExtensaoId,
        );

        if (!projeto) return null;

        return {
          id: projeto.id,
          atividadeExtensaoId: projeto.atividadeExtensao.id,
          atividadeTitulo: projeto.atividadeExtensao.titulo,
          resumo: projeto.resumo,
          status: projeto.status,
          urlAnexo: projeto.urlAnexo,
          feedbackProfessor: projeto.feedbackProfessor,
          nome: projeto.nome,
        };
      }),
    );

    return projetos.filter((p) => p !== null) as GetProjetosResponseDto[];
  }
}
