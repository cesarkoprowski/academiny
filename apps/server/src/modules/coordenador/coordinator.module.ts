import { Module } from '@nestjs/common';
import CreateTeacherUC from './usecase/create-teacher.usecase';
import GetAllCoordenadoresUC from './usecase/get-all-coordenadores.usecase';
import GetCoordenadorByIdUC from './usecase/get-coordenador-by-id.usecase';
import UpdateCoordenadorUC from './usecase/update-coordenador.usecase';
import ProfessorRepository from 'infra/repository/professor.repository.imp';
import { TypeOrmModule } from '@nestjs/typeorm';
import Pessoa from 'common/entities/pessoa/pessoa.entity';
import Professor from 'common/entities/professor/professor.entity';
import CoordinatorController from './controller/coordinator.controller';
import Coordenador from 'common/entities/coordenador/coordenador.entity';
import UserRepository from 'infra/repository/user.repository.imp';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';
import DeleteProfessorUC from 'modules/professor/usecase/delete-professor.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa, Professor, Coordenador])],
  providers: [
    CreateTeacherUC,
    GetAllCoordenadoresUC,
    GetCoordenadorByIdUC,
    UpdateCoordenadorUC,
    DeleteProfessorUC,
    ProfessorRepository,
    UserRepository,
    CoordinatorRepository,
  ],
  controllers: [CoordinatorController],
})
export default class CoordenadorModule {}
