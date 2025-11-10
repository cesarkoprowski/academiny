import { Module } from '@nestjs/common';
import DisciplinaController from './controller/disciplina.controller';
import CreateDisciplinaUC from './usecase/create-disciplina.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import Disciplina from 'common/entities/disciplina/disciplina.entity';
import Coordenador from 'common/entities/coordenador/coordenador.entity';
import DisciplinaRepository from 'infra/repository/disciplina.repository.imp';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';

@Module({
  imports: [TypeOrmModule.forFeature([Disciplina, Coordenador])],
  controllers: [DisciplinaController],
  exports: [],
  providers: [CreateDisciplinaUC, DisciplinaRepository, CoordinatorRepository],
})
export class DisciplinaModule {}
