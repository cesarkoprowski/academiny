import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import UpdateProjetoRequestDto from '../dto/request/update-projeto.request.dto';
import UpdateProjetoResponseDto from '../dto/response/update-projeto.response.dto';
import ProjetoExtensaoRepository from 'infra/repository/projeto.repository.imp';
import AlunoProjetoRepository from 'infra/repository/aluno-projeto.repository.imp';

@Injectable()
export default class UpdateProjetoUC {
  constructor(
    @Inject(ProjetoExtensaoRepository)
    private readonly projetoRepository: ProjetoExtensaoRepository,
    @Inject(AlunoProjetoRepository)
    private readonly alunoProjetoRepository: AlunoProjetoRepository,
  ) {}

  async execute(
    alunoId: number,
    input: UpdateProjetoRequestDto,
  ): Promise<UpdateProjetoResponseDto> {
    const alunoProjeto =
      await this.alunoProjetoRepository.findByAlunoAndProjeto(
        alunoId,
        input.projetoId,
      );

    if (!alunoProjeto) {
      throw new NotFoundException(
        'Projeto não encontrado ou você não tem permissão para editá-lo',
      );
    }

    const projeto = await this.projetoRepository.update(input.projetoId, {
      resumo: input.resumo,
      urlAnexo: input.urlAnexo,
    });

    if (!projeto) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return {
      id: projeto.id,
      resumo: projeto.resumo,
      status: projeto.status,
      urlAnexo: projeto.urlAnexo,
    };
  }
}
