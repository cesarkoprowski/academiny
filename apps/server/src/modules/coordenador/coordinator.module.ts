import { Module } from '@nestjs/common';
import CreateTeacherUC from './usecase/create-teacher.usecase';
import ProfessorRepository from 'infra/repository/professor.repository.imp';
import { TypeOrmModule } from '@nestjs/typeorm';
import Pessoa from 'common/entities/pessoa/pessoa.entity';
import Professor from 'common/entities/professor/professor.entity';
import CoordinatorController from './controller/coordinator.controller';
import Coordenador from 'common/entities/coordenador/coordenador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa, Professor, Coordenador])],
  providers: [CreateTeacherUC, ProfessorRepository],
  controllers: [CoordinatorController],
})
export default class UserModule {}
