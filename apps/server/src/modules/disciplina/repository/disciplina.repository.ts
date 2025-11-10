import Disciplina from 'common/entities/disciplina/disciplina.entity';
import DisciplinaCreateRequestDto from '../dto/request/disciplina-create.request.dto';

export default interface IDisciplinaRepository {
  create(input: DisciplinaCreateRequestDto): Promise<Disciplina>;
}
