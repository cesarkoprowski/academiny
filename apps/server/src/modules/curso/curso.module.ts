import { Module } from '@nestjs/common';
import CursoController from './controller/curso.controller';
import CreateCursoUC from './usecase/create-curso.usecase';
import GetAllCursosUC from './usecase/get-all-cursos.usecase';
import GetCursoByIdUC from './usecase/get-curso-by-id.usecase';
import UpdateCursoUC from './usecase/update-curso.usecase';
import DeleteCursoUC from './usecase/delete-curso.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import Curso from 'common/entities/curso/curso.entity';
import CursoRepository from 'infra/repository/curso.repository.imp';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';
import Coordenador from 'common/entities/coordenador/coordenador.entity';
import CreateLinkDisciplineUC from './usecase/create-link-discipline.usecase';
import CursoDisciplinaRepository from 'infra/repository/curso-disciplina.repository.imp';
import CursoDisciplina from 'common/aggregate/curso-disciplina/curso-disciplina.aggregate';

@Module({
  imports: [
    TypeOrmModule.forFeature([Curso]),
    TypeOrmModule.forFeature([Coordenador]),
    TypeOrmModule.forFeature([CursoDisciplina]),
  ],
  controllers: [CursoController],
  exports: [],
  providers: [
    CreateCursoUC,
    GetAllCursosUC,
    GetCursoByIdUC,
    UpdateCursoUC,
    DeleteCursoUC,
    CursoRepository,
    CoordinatorRepository,
    CreateLinkDisciplineUC,
    CursoDisciplinaRepository,
  ],
})
export class CursoModule {}
