import { Module } from '@nestjs/common';
import AtividadeExtensaoController from './controller/atividade.controller';
import AtividadeExtensaoCreateUC from './usecase/atividade-create.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import AtividadeExtensao from 'common/entities/atividade/atividade.entity';
import Coordenador from 'common/entities/coordenador/coordenador.entity';
import AtividadeExtensaoRepository from 'infra/repository/atividade.repository.imp';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';

@Module({
  imports: [TypeOrmModule.forFeature([AtividadeExtensao, Coordenador])],
  controllers: [AtividadeExtensaoController],
  exports: [],
  providers: [
    AtividadeExtensaoCreateUC,
    AtividadeExtensaoRepository,
    CoordinatorRepository,
  ],
})
export class AtividadeExtensaoModule {}
