import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import AtividadeExtensao from "common/entities/atividade/atividade.entity";
import AtividadeExtensaoCreateRequestDto from "modules/atividade/dto/request/atividade-create.request.dto";
import IAtividadeExtensaoRepository from "modules/atividade/repository/atividade.repository";
import { Repository } from "typeorm";

@Injectable()
export default class AtividadeExtensaoRepository implements IAtividadeExtensaoRepository {
  constructor(
    @InjectRepository(AtividadeExtensao)
    private readonly repository: Repository<AtividadeExtensao>,
  ) {}

  async create(input: AtividadeExtensaoCreateRequestDto): Promise<AtividadeExtensao> {
    const newAtividadeExtensao: Partial<AtividadeExtensao> = {
      titulo: input.titulo,
      descricao: input.descricao,
      cargaHoraria: input.cargaHoraria,
    };
    return await this.repository.save(newAtividadeExtensao);
    }
}