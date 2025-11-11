import Aluno from 'common/entities/aluno/aluno.entity';
import { IRepository } from 'common/interface/repository.interface';
import CreateAlunoRequestDTO from '../professor/dto/request/create-aluno.request.dto';

export default interface IAlunoRepository extends IRepository {
  create(input: CreateAlunoRequestDTO): Promise<Aluno>;
  getById(input: number): Promise<Aluno | null>;
}
