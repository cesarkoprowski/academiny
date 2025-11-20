import { Module } from '@nestjs/common';
import DisciplinaController from './controller/disciplina.controller';
import CreateDisciplinaUC from './usecase/create-disciplina.usecase';
import DisciplinaUpdateUC from './usecase/disciplina-update.usecase';
import DisciplinaDeleteUC from './usecase/disciplina-delete.usecase';
import GetAllDisciplinaUC from './usecase/get-all-disciplina.usecase';
import GetDisciplinaByIdUC from './usecase/get-disciplina-by-id.usecase';
import AddProfessorToDisciplinaUC from './usecase/add-professor-disciplina.usecase';
import RemoveProfessorFromDisciplinaUC from './usecase/remove-professor-disciplina.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import Disciplina from 'common/entities/disciplina/disciplina.entity';
import Coordenador from 'common/entities/coordenador/coordenador.entity';
import Professor from 'common/entities/professor/professor.entity';
import ProfessorDisciplina from 'common/aggregate/professor-disciplina/professor-disciplina.aggregate';
import DisciplinaRepository from 'infra/repository/disciplina.repository.imp';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';
import ProfessorRepository from 'infra/repository/professor.repository.imp';
import ProfessorDisciplinaRepository from 'infra/repository/professor-disciplina.repository.imp';
import AuthGuardCoordinator from 'common/security/auth/entity/auth.coordinator.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Disciplina,
      Coordenador,
      Professor,
      ProfessorDisciplina,
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
    DisciplinaRepository,
    CoordinatorRepository,
    ProfessorRepository,
    ProfessorDisciplinaRepository,
  ],
})
export class DisciplinaModule {}
