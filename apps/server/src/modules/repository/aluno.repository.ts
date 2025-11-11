import Aluno from 'common/entities/aluno/aluno.entity';
import { IRepository } from 'common/interface/repository.interface';

export default interface IAlunoRepository extends IRepository {
  findByMatricula(matricula: string): Promise<Aluno | null>;
  findByCurso(cursoId: number): Promise<Aluno[]>;
}
