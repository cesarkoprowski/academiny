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

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa, PasswordReset])],
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
  ],
  controllers: [UserController],
})
export default class UserModule {}
