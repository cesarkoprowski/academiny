import { Module } from '@nestjs/common';
import { AlunoController } from './controller/aluno.controller';
import AlunosProfessorController from './controller/alunos-professor.controller';
import AlunoRepository from 'infra/repository/aluno.repository.imp';
import { TypeOrmModule } from '@nestjs/typeorm';
import Pessoa from 'common/entities/pessoa/pessoa.entity';
import Aluno from 'common/entities/aluno/aluno.entity';
import Professor from 'common/entities/professor/professor.entity';
import CreateAlunoUC from 'modules/professor/usecase/create-aluno.use.case';
import GetAllAlunosUC from './usecase/get-all-alunos.usecase';
import GetAlunoByIdUC from './usecase/get-aluno-by-id.usecase';
import UpdateAlunoUC from './usecase/update-aluno.usecase';
import DeleteAlunoUC from './usecase/delete-aluno.usecase';
import UserRepository from 'infra/repository/user.repository.imp';
import ProfessorRepository from 'infra/repository/professor.repository.imp';
import ProjetoExtensao from 'common/entities/projeto/projeto.entity';
import ProjetoExtensaoRepository from 'infra/repository/projeto.repository.imp';
import SubscribeActivityUC from './usecase/assinar-atividade.usescase';
import AlunoAtividadeExtensao from 'common/aggregate/aluno-atividade/aluno-atividade.aggregate';
import AlunoAtividadeRepository from 'infra/repository/aluno-atividade.repository.imp';
import AtividadeExtensao from 'common/entities/atividade/atividade.entity';
import AtividadeExtensaoRepository from 'infra/repository/atividade.repository.imp';
import UnsubscribeActivityUC from './usecase/desinscrever-atividade.usecase';
import CreateProjetoUC from './usecase/create-projeto.usecase';
import AlunoProjetoExtensao from 'common/aggregate/aluno-projeto/aluno-projeto.aggregate';
import AlunoProjetoRepository from 'infra/repository/aluno-projeto.repository.imp';
import UpdateProjetoUC from './usecase/update-projeto.usecase';
import GetProjetosUC from './usecase/get-projetos.usecase';
import GetAllAtividadesUC from './usecase/get-all-atividades.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pessoa,
      Aluno,
      Professor,
      ProjetoExtensao,
      AlunoAtividadeExtensao,
      AtividadeExtensao,
      AlunoProjetoExtensao,
    ]),
  ],
  controllers: [AlunoController, AlunosProfessorController],
  providers: [
    AlunoRepository,
    ProfessorRepository,
    CreateAlunoUC,
    GetAllAlunosUC,
    GetAlunoByIdUC,
    UpdateAlunoUC,
    DeleteAlunoUC,
    UserRepository,
    ProjetoExtensaoRepository,
    SubscribeActivityUC,
    UnsubscribeActivityUC,
    CreateProjetoUC,
    UpdateProjetoUC,
    GetProjetosUC,
    GetAllAtividadesUC,
    AlunoAtividadeRepository,
    AtividadeExtensaoRepository,
    AlunoProjetoRepository,
  ],
})
export default class AlunoModule {}
