import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import ProjetoExtensaoRepository from 'infra/repository/projeto.repository.imp';
import type IProjetoExtensaoRepository from '../repository/projeto.repository';
import ProjetoExtensaoCreateResponseDto from '../dto/response/projeto-create.response.dto';

@Injectable()
export default class ProjetoExtensaoGetAllUC
  implements IUseCase<void, ProjetoExtensaoCreateResponseDto[]>
{
  constructor(
    @Inject(ProjetoExtensaoRepository)
    private readonly projetoExtensaoRepository: IProjetoExtensaoRepository,
  ) {}

  async execute(): Promise<ProjetoExtensaoCreateResponseDto[]> {
    const projetos = await this.projetoExtensaoRepository.getAll();

    return projetos.map((projeto) => ({
      id: projeto.id,
      nome: projeto.nome,
      atividadeExtensaoId: projeto.atividadeExtensao.id,
      professorAvaliadorId: projeto.professorAvaliadorId.id,
      resumo: projeto.resumo,
      status: projeto.status,
      urlAnexo: projeto.urlAnexo,
      feedbackProfessor: projeto.feedbackProfessor,
    }));
  }
}
