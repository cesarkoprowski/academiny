import { Module } from '@nestjs/common';
import Coordenador from 'common/entities/coordenador/coordenador.entity';
import ProjetoExtensao from 'common/entities/projeto/projeto.entity';
import ProjetoExtensaoController from './controller/projeto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProjetoExtensaoCreateUC from './usecase/projeto-create.usecase';
import ProjetoExtensaoUpdateUC from './usecase/projeto-update.usecase';
import ProjetoExtensaoDeleteUC from './usecase/projeto-delete.usecase';
import ProjetoExtensaoGetAllUC from './usecase/projeto-get-all.usecase';
import ProjetoExtensaoRepository from 'infra/repository/projeto.repository.imp';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';
import Aluno from 'common/entities/aluno/aluno.entity';
import AlunoRepository from 'infra/repository/aluno.repository.imp';
import AlunoProjetoExtensao from 'common/aggregate/aluno-projeto/aluno-projeto.aggregate';
import AlunoProjetoRepository from 'infra/repository/aluno-projeto.repository.imp';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjetoExtensao,
      Coordenador,
      Aluno,
      AlunoProjetoExtensao,
    ]),
  ],
  controllers: [ProjetoExtensaoController],
  exports: [],
  providers: [
    ProjetoExtensaoCreateUC,
    ProjetoExtensaoUpdateUC,
    ProjetoExtensaoDeleteUC,
    ProjetoExtensaoGetAllUC,
    ProjetoExtensaoRepository,
    CoordinatorRepository,
    AlunoRepository,
    AlunoProjetoRepository,
  ],
})
export class ProjetoExtensaoModule {}
