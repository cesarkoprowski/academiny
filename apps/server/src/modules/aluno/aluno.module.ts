import { Module } from '@nestjs/common';
import { AlunoController } from './controller/aluno.controller';
import AlunoRepository from 'infra/repository/aluno.repository.imp';
import { TypeOrmModule } from '@nestjs/typeorm';
import Pessoa from 'common/entities/pessoa/pessoa.entity';
import Aluno from 'common/entities/aluno/aluno.entity';
import CreateAlunoUC from 'modules/professor/usecase/create-aluno.use.case';
import UserRepository from 'infra/repository/user.repository.imp';
import ProjetoExtensao from 'common/entities/projeto/projeto.entity';
import ProjetoExtensaoRepository from 'infra/repository/projeto.repository.imp';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa, Aluno, ProjetoExtensao])],
  controllers: [AlunoController],
  providers: [
    AlunoRepository,
    CreateAlunoUC,
    UserRepository,
    ProjetoExtensaoRepository,
  ],
})
export default class AlunoModule {}
