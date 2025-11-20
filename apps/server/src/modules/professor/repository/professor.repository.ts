import Professor from 'common/entities/professor/professor.entity';
import { IRepository } from 'common/interface/repository.interface';

export default interface IProfessorRepository extends IRepository<Professor> {
  findByCodigoCps(codigoCps: string): Promise<Professor | null>;
  findAllWithDetails(): Promise<Professor[]>;
  getByProfessorId(id: number): Promise<Professor | null>;
}
