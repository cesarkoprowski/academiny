import Coordenador from 'common/entities/coordenador/coordenador.entity';
import { IRepository } from 'common/interface/repository.interface';

export default interface ICoordinatorRepository
  extends IRepository<Coordenador> {
  findByCurso(cursoId: number): Promise<Coordenador | null>;
  findByProfessor(professorId: number): Promise<Coordenador | null>;
  getByIdWithRelations(id: number): Promise<Coordenador | null>;
}
