import Professor from 'common/entities/professor/professor.entity';
import CreateTeacherRequestDTO from 'modules/admin/dto/request/create-teacher.request.dto';

export default interface IProfessorRepository {
  create(userId: number, input: CreateTeacherRequestDTO): Promise<Professor>;
  getById(input: number): Promise<Professor | null>;
}
