import { Module } from '@nestjs/common';
import AtividadeExtensaoController from './controller/atividade.controller';
import AtividadeExtensaoCreateUC from './usecase/atividade-create.usecase';
import AtividadeExtensaoUpdateUC from './usecase/atividade-update.usecase';
import AtividadeExtensaoDeleteUC from './usecase/atividade-delete.usecase';
import AtividadeExtensaoGetAllUC from './usecase/atividade-get-all.usecase';
import AtividadeExtensaoGetByIdUC from './usecase/atividade-get-by-id.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import AtividadeExtensao from 'common/entities/atividade/atividade.entity';
import Coordenador from 'common/entities/coordenador/coordenador.entity';
import AtividadeExtensaoRepository from 'infra/repository/atividade.repository.imp';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';
import GetAllAtivUC from './usecase/atividade-getAll.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([AtividadeExtensao, Coordenador])],
  controllers: [AtividadeExtensaoController],
  exports: [],
  providers: [
    AtividadeExtensaoCreateUC,
    AtividadeExtensaoUpdateUC,
    AtividadeExtensaoDeleteUC,
    AtividadeExtensaoGetAllUC,
    AtividadeExtensaoGetByIdUC,
    AtividadeExtensaoRepository,
    CoordinatorRepository,
    GetAllAtivUC,
  ],
})
export class AtividadeExtensaoModule {}
