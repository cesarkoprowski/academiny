import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import CreateProjetoRequestDto from '../dto/request/create-projeto.request.dto';
import CreateProjetoResponseDto from '../dto/response/create-projeto.response.dto';
import AlunoAtividadeRepository from 'infra/repository/aluno-atividade.repository.imp';
import ProjetoExtensaoRepository from 'infra/repository/projeto.repository.imp';
import AlunoProjetoRepository from 'infra/repository/aluno-projeto.repository.imp';
import AtividadeExtensaoRepository from 'infra/repository/atividade.repository.imp';
import { EProjetoStatus } from 'modules/projeto/enum/projeto-status.enum';

@Injectable()
export default class CreateProjetoUC {
  constructor(
    @Inject(AlunoAtividadeRepository)
    private readonly alunoAtividadeRepository: AlunoAtividadeRepository,
    @Inject(ProjetoExtensaoRepository)
    private readonly projetoRepository: ProjetoExtensaoRepository,
    @Inject(AlunoProjetoRepository)
    private readonly alunoProjetoRepository: AlunoProjetoRepository,
    @Inject(AtividadeExtensaoRepository)
    private readonly atividadeRepository: AtividadeExtensaoRepository,
  ) {}

  async execute(
    alunoId: number,
    input: CreateProjetoRequestDto,
  ): Promise<CreateProjetoResponseDto> {
    const atividade = await this.atividadeRepository.getById(
      input.atividadeExtensaoId,
    );
    if (!atividade) {
      throw new NotFoundException('Atividade de extensão não encontrada');
    }

    const subscription =
      await this.alunoAtividadeRepository.findByAlunoAndAtividade(
        alunoId,
        input.atividadeExtensaoId,
      );

    if (!subscription) {
      throw new NotFoundException(
        'Você não está inscrito nesta atividade de extensão',
      );
    }

    const projeto = await this.projetoRepository.create({
      nome: input.nome,
      atividadeExtensao: atividade,
      resumo: input.resumo,
      urlAnexo: input.urlAnexo,
      status: EProjetoStatus.PENDENTE,
    });

    await this.alunoProjetoRepository.create({
      alunoId,
      projetoExtensaoId: projeto.id,
    });

    return {
      id: projeto.id,
      alunoId,
      atividadeExtensaoId: input.atividadeExtensaoId,
      resumo: projeto.resumo,
      status: projeto.status,
      urlAnexo: projeto.urlAnexo,
    };
  }
}
