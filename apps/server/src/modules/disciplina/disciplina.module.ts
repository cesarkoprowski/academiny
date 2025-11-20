import { Module } from '@nestjs/common';
import DisciplinaController from './controller/disciplina.controller';
import CreateDisciplinaUC from './usecase/create-disciplina.usecase';
import DisciplinaUpdateUC from './usecase/disciplina-update.usecase';
import DisciplinaDeleteUC from './usecase/disciplina-delete.usecase';
import GetAllDisciplinaUC from './usecase/get-all-disciplina.usecase';
import GetDisciplinaByIdUC from './usecase/get-disciplina-by-id.usecase';
import AddProfessorToDisciplinaUC from './usecase/add-professor-disciplina.usecase';
import RemoveProfessorFromDisciplinaUC from './usecase/remove-professor-disciplina.usecase';
import EnrollAlunoDisciplinaUC from './usecase/enroll-aluno-disciplina.usecase';
import UnenrollAlunoDisciplinaUC from './usecase/unenroll-aluno-disciplina.usecase';
import GetDisciplinasAlunoUC from './usecase/get-disciplinas-aluno.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import Disciplina from 'common/entities/disciplina/disciplina.entity';
import Coordenador from 'common/entities/coordenador/coordenador.entity';
import Professor from 'common/entities/professor/professor.entity';
import Aluno from 'common/entities/aluno/aluno.entity';
import ProfessorDisciplina from 'common/aggregate/professor-disciplina/professor-disciplina.aggregate';
import AlunoDisciplina from 'common/aggregate/aluno-disciplina/aluno-disciplina.aggregate';
import DisciplinaRepository from 'infra/repository/disciplina.repository.imp';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';
import ProfessorRepository from 'infra/repository/professor.repository.imp';
import AlunoRepository from 'infra/repository/aluno.repository.imp';
import ProfessorDisciplinaRepository from 'infra/repository/professor-disciplina.repository.imp';
import AlunoDisciplinaRepository from 'infra/repository/aluno-disciplina.repository.imp';
import AuthGuardCoordinator from 'common/security/auth/entity/auth.coordinator.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Disciplina,
      Coordenador,
      Professor,
      Aluno,
      ProfessorDisciplina,
      AlunoDisciplina,
    ]),
  ],
  controllers: [DisciplinaController],
  providers: [
    AuthGuardCoordinator,
    CreateDisciplinaUC,
    DisciplinaUpdateUC,
    DisciplinaDeleteUC,
    GetAllDisciplinaUC,
    GetDisciplinaByIdUC,
    AddProfessorToDisciplinaUC,
    RemoveProfessorFromDisciplinaUC,
    EnrollAlunoDisciplinaUC,
    UnenrollAlunoDisciplinaUC,
    GetDisciplinasAlunoUC,
    DisciplinaRepository,
    CoordinatorRepository,
    ProfessorRepository,
    AlunoRepository,
    ProfessorDisciplinaRepository,
    AlunoDisciplinaRepository,
  ],
})
export class DisciplinaModule {}
