import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "common/interface/use-case.interface";
import AtividadeExtensaoCreateRequestDto from "../dto/request/atividade-create.request.dto";
import AtividadeExtensaoCreateResponseDto from "../dto/response/atividade-create.response.dto";
import AtividadeExtensaoRepository from "infra/repository/atividade.repository.imp";

@Injectable()
export default class AtividadeExtensaoCreateUC implements IUseCase<AtividadeExtensaoCreateRequestDto, AtividadeExtensaoCreateResponseDto> {
  constructor(
    @Inject(AtividadeExtensaoRepository)
    private readonly atividadeExtensaoRepository: AtividadeExtensaoRepository,
  ) {}

  async execute(input: AtividadeExtensaoCreateRequestDto): Promise<AtividadeExtensaoCreateResponseDto> {
    const newAtividade = await this.atividadeExtensaoRepository.create(input);

    const atividadeCreateResponseDto = {
      id: newAtividade.id,
      titulo: newAtividade.titulo,
      descricao: newAtividade.descricao,
      cargaHoraria: newAtividade.cargaHoraria,
    }

    return atividadeCreateResponseDto;
  }

}