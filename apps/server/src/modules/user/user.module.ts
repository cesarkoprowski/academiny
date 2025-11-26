import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserController from './controller/user.controller';
import CreateUserUC from './usecases/user/create-user.usecase';
import AuthService from 'common/services/auth.service';
import UserRepository from 'infra/repository/user.repository.imp';
import Pessoa from 'common/entities/pessoa/pessoa.entity';
import LoginUC from './usecases/user/login.usecase';
import UpdateUserUC from './usecases/user/update-user.usecase';
import PasswordReset from 'common/entities/password-reset/password-reset.entity';
import PasswordResetRepository from 'infra/repository/password-reset.repository.imp';
import EmailService from 'common/services/email.service';
import ForgotPasswordUC from './usecases/user/forgot-password.usecase';
import ResetPasswordUC from './usecases/user/reset-password.usecase';
import GetMeUC from './usecases/user/get-me.usecase';
import GetAllNotificationUC from 'modules/notification/usecase/get-all-notification.usecase';
import NotificationRepository from 'modules/notification/repository/notification.repository';
import Notification from 'common/entities/notification/notification.entity';
import ReadAllNotificationUC from 'modules/notification/usecase/read-all-notification.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa, PasswordReset, Notification])],
  providers: [
    CreateUserUC,
    LoginUC,
    AuthService,
    UserRepository,
    UpdateUserUC,
    PasswordResetRepository,
    EmailService,
    ForgotPasswordUC,
    ResetPasswordUC,
    GetAllNotificationUC,
    NotificationRepository,
    ReadAllNotificationUC,
    GetMeUC,
  ],
  controllers: [UserController],
})
export default class UserModule {}
