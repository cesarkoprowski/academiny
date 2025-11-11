import Professor from 'common/entities/professor/professor.entity';
import { IRepository } from 'common/interface/repository.interface';
import CreateTeacherRequestDTO from 'modules/admin/dto/request/create-teacher.request.dto';

export default interface IProfessorRepository extends IRepository {
  create(input: CreateTeacherRequestDTO): Promise<Professor>;
  getById(input: number): Promise<Professor | null>;
}
