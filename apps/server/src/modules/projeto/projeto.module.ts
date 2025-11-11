import { Module } from '@nestjs/common';
import Coordenador from 'common/entities/coordenador/coordenador.entity';
import ProjetoExtensao from 'common/entities/projeto/projeto.entity';
import ProjetoExtensaoController from './controller/projeto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProjetoExtensaoCreateUC from './usecase/projeto-create.usecase';
import ProjetoExtensaoRepository from 'infra/repository/projeto.repository.imp';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';
import Aluno from 'common/entities/aluno/aluno.entity';
import AlunoRepository from 'infra/repository/aluno.repository.imp';

@Module({
  imports: [TypeOrmModule.forFeature([ProjetoExtensao, Coordenador, Aluno])],
  controllers: [ProjetoExtensaoController],
  exports: [],
  providers: [
    ProjetoExtensaoCreateUC,
    ProjetoExtensaoRepository,
    CoordinatorRepository,
    AlunoRepository,
  ],
})
export class ProjetoExtensaoModule {}
