import { Module } from '@nestjs/common';
import Coordenador from 'common/entities/coordenador/coordenador.entity';
import ProjetoExtensao from 'common/entities/projeto/projeto.entity';
import ProjetoExtensaoController from './controller/projeto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProjetoExtensaoCreateUC from './usecase/projeto-create.usecase';
import ProjetoExtensaoUpdateUC from './usecase/projeto-update.usecase';
import ProjetoExtensaoDeleteUC from './usecase/projeto-delete.usecase';
import ProjetoExtensaoGetAllUC from './usecase/projeto-get-all.usecase';
import AcceptProjetoUC from './usecase/projeto-accept.usecase';
import DeniedProjetoUC from './usecase/projeto-denied.usecase';
import ProjetoExtensaoRepository from 'infra/repository/projeto.repository.imp';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';
import Aluno from 'common/entities/aluno/aluno.entity';
import AlunoRepository from 'infra/repository/aluno.repository.imp';
import AlunoProjetoExtensao from 'common/aggregate/aluno-projeto/aluno-projeto.aggregate';
import AlunoProjetoRepository from 'infra/repository/aluno-projeto.repository.imp';
import SendNotificationUC from 'modules/notification/usecase/send-notification.usecase';
import Notification from 'common/entities/notification/notification.entity';
import AuthGuardTeacher from 'common/security/auth/entity/auth.teacher.guard';
import Professor from 'common/entities/professor/professor.entity';
import ProfessorRepository from 'infra/repository/professor.repository.imp';
import Pessoa from 'common/entities/pessoa/pessoa.entity';
import NotificationRepository from 'modules/notification/repository/notification.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjetoExtensao,
      Coordenador,
      Aluno,
      AlunoProjetoExtensao,
      Notification,
      Professor,
      Pessoa,
    ]),
  ],
  controllers: [ProjetoExtensaoController],
  exports: [],
  providers: [
    AuthGuardTeacher,
    ProjetoExtensaoCreateUC,
    ProjetoExtensaoUpdateUC,
    ProjetoExtensaoDeleteUC,
    ProjetoExtensaoGetAllUC,
    AcceptProjetoUC,
    DeniedProjetoUC,
    ProjetoExtensaoRepository,
    CoordinatorRepository,
    AlunoRepository,
    AlunoProjetoRepository,
    SendNotificationUC,
    NotificationRepository,
    ProfessorRepository,
  ],
})
export class ProjetoExtensaoModule {}
