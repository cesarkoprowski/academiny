import Curso from 'common/entities/curso/curso.entity';
import CursoRequestCreateDto from 'modules/curso/dto/request/curso-create.request.dto';

export default interface ICursoRepository {
  create(input: CursoRequestCreateDto): Promise<Curso>;
}
