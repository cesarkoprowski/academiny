import { Module } from '@nestjs/common';
import Coordenador from 'common/entities/coordenador/coordenador.entity';
import Pessoa from 'common/entities/pessoa/pessoa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import AdminController from './controller/admin.controller';
import CreateCoordinatorUC from './usecase/admin/create-coordinator.usecase';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';
import UserRepository from 'infra/repository/user.repository.imp';
import Professor from 'common/entities/professor/professor.entity';
import ProfessorRepository from 'infra/repository/professor.repository.imp';
import DeleteCoordinatorUC from './usecase/delete-coordinator.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa, Coordenador, Professor])],
  controllers: [AdminController],
  providers: [
    CreateCoordinatorUC,
    DeleteCoordinatorUC,
    CoordinatorRepository,
    UserRepository,
    ProfessorRepository,
  ],
})
export default class AdminModule {}
