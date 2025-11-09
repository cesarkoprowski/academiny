import { Module } from "@nestjs/common";
import AtividadeExtensaoController from "./controller/atividade.controller";
import AtividadeExtensaoCreateUC from "./usecase/atividade-create.usecase";
import { TypeOrmModule } from "@nestjs/typeorm";
import AtividadeExtensao from "common/entities/atividade/atividade.entity";
import AtividadeExtensaoRepository from "infra/repository/atividade.repository.imp";

@Module({
  imports: [TypeOrmModule.forFeature([AtividadeExtensao])],
  controllers: [AtividadeExtensaoController],
  exports: [],
  providers: [AtividadeExtensaoCreateUC, AtividadeExtensaoRepository],
}) export class AtividadeExtensaoModule {}
