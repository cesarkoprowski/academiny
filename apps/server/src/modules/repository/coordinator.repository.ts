import Coordenador from 'common/entities/coordenador/coordenador.entity';
import { IRepository } from 'common/interface/repository.interface';

export default interface ICoordinatorRepository extends IRepository {
  findByCurso(cursoId: number): Promise<Coordenador | null>;
  findByProfessor(professorId: number): Promise<Coordenador | null>;
}
