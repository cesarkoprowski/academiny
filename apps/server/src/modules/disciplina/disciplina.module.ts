import { Module } from '@nestjs/common';
import DisciplinaController from './controller/disciplina.controller';
import CreateDisciplinaUC from './usecase/create-disciplina.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import Disciplina from 'common/entities/disciplina/disciplina.entity';
import DisciplinaRepository from 'infra/repository/disciplina.repository.imp';

@Module({
  imports: [TypeOrmModule.forFeature([Disciplina])],
  controllers: [DisciplinaController],
  exports: [],
  providers: [CreateDisciplinaUC, DisciplinaRepository,],
})
export class DisciplinaModule {}
