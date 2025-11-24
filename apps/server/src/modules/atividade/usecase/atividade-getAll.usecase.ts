import { Inject, Injectable } from '@nestjs/common';
import AtividadeExtensaoRepository from 'infra/repository/atividade.repository.imp';
import GetAllAtividadesResponseDto from '../dto/response/get-all-atividades.response.dto';

@Injectable()
export default class GetAllAtivUC {
  constructor(
    @Inject(AtividadeExtensaoRepository)
    private readonly atividadeRepository: AtividadeExtensaoRepository,
  ) {}

  async execute(
  ): Promise<GetAllAtividadesResponseDto[]> {
    const atividades = await this.atividadeRepository.getAll()
    return (atividades.map((atividade) => {
      return {
        id: atividade.id,
        titulo: atividade.titulo,
        descricao: atividade.descricao,
        cargaHoraria: atividade.cargaHoraria,
      }
    }))
  }
}
