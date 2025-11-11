import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import ProjetoExtensaoCreateRequestDto from '../dto/request/projeto-create.request.dto';
import ProjetoExtensaoCreateResponseDto from '../dto/response/projeto-create.response.dto';
import type IProjetoExtensaoRepository from '../repository/projeto.repository';
import ProjetoExtensaoRepository from 'infra/repository/projeto.repository.imp';
import AtividadeExtensao from 'common/entities/atividade/atividade.entity';
import Professor from 'common/entities/professor/professor.entity';

@Injectable()
export default class ProjetoExtensaoCreateUC
  implements
    IUseCase<ProjetoExtensaoCreateRequestDto, ProjetoExtensaoCreateResponseDto>
{
  constructor(
    @Inject(ProjetoExtensaoRepository)
    private readonly projetoExtensaoRepository: IProjetoExtensaoRepository,
  ) {}

  async execute(
    input: ProjetoExtensaoCreateRequestDto,
  ): Promise<ProjetoExtensaoCreateResponseDto> {
    const newProjeto = await this.projetoExtensaoRepository.create({
      nome: input.nome,
      atividadeExtensao: {
        id: input.atividadeExtensaoId,
      } as AtividadeExtensao,
      professorAvaliadorId: {
        id: input.professorAvaliadorId,
      } as Professor,
      feedbackProfessor: input.feedbackProfessor,
      resumo: input.resumo,
      urlAnexo: input.urlAnexo,
    });

    const projetoCreateResponseDto: ProjetoExtensaoCreateResponseDto = {
      atividadeExtensaoId: newProjeto.atividadeExtensao.id,
      feedbackProfessor: newProjeto.feedbackProfessor,
      professorAvaliadorId: newProjeto.professorAvaliadorId.id,
      resumo: newProjeto.resumo,
      id: newProjeto.id,
      status: newProjeto.status,
      urlAnexo: newProjeto.urlAnexo,
      nome: newProjeto.nome,
    };

    return projetoCreateResponseDto;
  }
}
