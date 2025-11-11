import Pessoa from 'common/entities/pessoa/pessoa.entity';
import { IRepository } from 'common/interface/repository.interface';

export default interface IUserRepository extends IRepository {
  getByEmail(email: string): Promise<Pessoa | null>;
  findByCpf(cpf: string): Promise<Pessoa | null>;
  findByNome(nome: string): Promise<Pessoa[]>;
}
