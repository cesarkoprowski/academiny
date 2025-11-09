import AtividadeExtensao from "common/entities/atividade/atividade.entity";
import AtividadeExtensaoCreateRequestDto from "../dto/request/atividade-create.request.dto";

export default interface IAtividadeExtensaoRepository {
  create(input: AtividadeExtensaoCreateRequestDto): Promise<AtividadeExtensao>;
}