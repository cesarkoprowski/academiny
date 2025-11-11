import Disciplina from 'common/entities/disciplina/disciplina.entity';
import DisciplinaCreateRequestDto from '../dto/request/disciplina-create.request.dto';
import { IRepository } from 'common/interface/repository.interface';

export default interface IDisciplinaRepository extends IRepository {
  create(input: DisciplinaCreateRequestDto): Promise<Disciplina>;
}
