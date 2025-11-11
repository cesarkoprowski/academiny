import { Module } from '@nestjs/common';
import CursoController from './controller/curso.controller';
import CreateCursoUC from './usecase/create-curso.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import Curso from 'common/entities/curso/curso.entity';
import CursoRepository from 'infra/repository/curso.repository.imp';

@Module({
  imports: [TypeOrmModule.forFeature([Curso])],
  controllers: [CursoController],
  exports: [],
  providers: [CreateCursoUC, CursoRepository],
})
export class CursoModule {}
