import { Module } from '@nestjs/common';
import TeacherController from './controller/professor.controller';
import AuthGuardTeacher from 'common/security/auth/entity/auth.teacher.guard';
import AuthGuardCoordinator from 'common/security/auth/entity/auth.coordinator.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import Professor from 'common/entities/professor/professor.entity';
import Coordenador from 'common/entities/coordenador/coordenador.entity';
import ProfessorRepository from 'infra/repository/professor.repository.imp';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';
import CreateAlunoUC from './usecase/create-aluno.use.case';
import GetAllProfessorsUC from './usecase/get-all-professors.usecase';
import UserRepository from 'infra/repository/user.repository.imp';
import AlunoRepository from 'infra/repository/aluno.repository.imp';
import Pessoa from 'common/entities/pessoa/pessoa.entity';
import Aluno from 'common/entities/aluno/aluno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Professor, Pessoa, Aluno, Coordenador])],
  controllers: [TeacherController],
  providers: [
    AuthGuardTeacher,
    AuthGuardCoordinator,
    ProfessorRepository,
    CoordinatorRepository,
    CreateAlunoUC,
    GetAllProfessorsUC,
    UserRepository,
    AlunoRepository,
  ],
})
export default class ProfessorModule {}
