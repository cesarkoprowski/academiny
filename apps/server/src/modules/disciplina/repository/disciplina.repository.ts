import Disciplina from 'common/entities/disciplina/disciplina.entity';
import { IRepository } from 'common/interface/repository.interface';

export default interface IDisciplinaRepository extends IRepository {
  findByCodigo(codigo: string): Promise<Disciplina | null>;
  findByNome(nome: string): Promise<Disciplina[]>;
}
