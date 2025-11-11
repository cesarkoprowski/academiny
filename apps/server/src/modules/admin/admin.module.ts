import { Module } from '@nestjs/common';
import Coordenador from 'common/entities/coordenador/coordenador.entity';
import Pessoa from 'common/entities/pessoa/pessoa.entity';
import Professor from 'common/entities/professor/professor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import AdminController from './controller/admin.controller';
import CreateCoordinatorUC from './usecase/admin/create-coordinator.usecase';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';
import ProfessorRepository from 'infra/repository/professor.repository.imp';
import CreateTeacherUC from './usecase/admin/create-teacher.usecase';
import UserRepository from 'infra/repository/user.repository.imp';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa, Professor, Coordenador])],
  controllers: [AdminController],
  providers: [
    CreateCoordinatorUC,
    CoordinatorRepository,
    ProfessorRepository,
    CreateTeacherUC,
    UserRepository,
  ],
})
export default class AdminModule {}
