import { Inject, Injectable } from '@nestjs/common';
import AtividadeExtensaoRepository from 'infra/repository/atividade.repository.imp';
import AlunoAtividadeRepository from 'infra/repository/aluno-atividade.repository.imp';
import GetAllAtividadesResponseDto from '../dto/response/get-all-atividades.response.dto';

@Injectable()
export default class GetAllAtividadesUC {
  constructor(
    @Inject(AtividadeExtensaoRepository)
    private readonly atividadeRepository: AtividadeExtensaoRepository,
    @Inject(AlunoAtividadeRepository)
    private readonly alunoAtividadeRepository: AlunoAtividadeRepository,
  ) {}

  async execute(alunoId: number): Promise<GetAllAtividadesResponseDto[]> {
    const alunoAtividades =
      await this.alunoAtividadeRepository.findByAluno(alunoId);

    const atividades = await Promise.all(
      alunoAtividades.map(async (alunoAtividade) => {
        const atividade = await this.atividadeRepository.getById(
          alunoAtividade.atividadeExtensaoId,
        );

        if (!atividade) return null;

        return {
          id: atividade.id,
          titulo: atividade.titulo,
          descricao: atividade.descricao,
          cargaHoraria: atividade.cargaHoraria,
        };
      }),
    );

    return atividades.filter(
      (a) => a !== null,
    ) as GetAllAtividadesResponseDto[];
  }
}
