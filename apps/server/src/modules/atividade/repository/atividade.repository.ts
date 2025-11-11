import AtividadeExtensao from 'common/entities/atividade/atividade.entity';
import AtividadeExtensaoCreateRequestDto from '../dto/request/atividade-create.request.dto';
import { IRepository } from 'common/interface/repository.interface';

export default interface IAtividadeExtensaoRepository extends IRepository {
  create(input: AtividadeExtensaoCreateRequestDto): Promise<AtividadeExtensao>;
}
