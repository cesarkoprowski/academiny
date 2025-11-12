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
import SubscribeActivityUC from './usecase/assinar-atividade.usescase';
import AlunoAtividadeExtensao from 'common/aggregate/aluno-atividade/aluno-atividade.aggregate';
import AlunoAtividadeRepository from 'infra/repository/aluno-atividade.repository.imp';
import AtividadeExtensao from 'common/entities/atividade/atividade.entity';
import AtividadeExtensaoRepository from 'infra/repository/atividade.repository.imp';
import UnsubscribeActivityUC from './usecase/desinscrever-atividade.usecase';
import CreateProjetoUC from './usecase/create-projeto.usecase';
import AlunoProjetoExtensao from 'common/aggregate/aluno-projeto/aluno.projeto.aggregate';
import AlunoProjetoRepository from 'infra/repository/aluno-projeto.repository.imp';
import UpdateProjetoUC from './usecase/update-projeto.usecase';
import GetProjetosUC from './usecase/get-projetos.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pessoa,
      Aluno,
      ProjetoExtensao,
      AlunoAtividadeExtensao,
      AtividadeExtensao,
      AlunoProjetoExtensao,
    ]),
  ],
  controllers: [AlunoController],
  providers: [
    AlunoRepository,
    CreateAlunoUC,
    UserRepository,
    ProjetoExtensaoRepository,
    SubscribeActivityUC,
    UnsubscribeActivityUC,
    CreateProjetoUC,
    UpdateProjetoUC,
    GetProjetosUC,
    AlunoAtividadeRepository,
    AtividadeExtensaoRepository,
    AlunoProjetoRepository,
  ],
})
export default class AlunoModule {}
