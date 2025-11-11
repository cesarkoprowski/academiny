import Curso from 'common/entities/curso/curso.entity';
import { IRepository } from 'common/interface/repository.interface';
import { Modalidade } from 'modules/curso/enum/modalidade.enum';

export default interface ICursoRepository extends IRepository {
  findByNome(nome: string): Promise<Curso | null>;
  findByModalidade(modalidade: Modalidade): Promise<Curso[]>;
}
