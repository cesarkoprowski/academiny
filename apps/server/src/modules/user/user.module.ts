import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserController from './controller/user.controller';
import CreateUserUC from './usecases/user/create-user.usecase';
import AuthService from 'common/services/auth.service';
import UserRepository from 'infra/repository/user.repository.imp';
import Pessoa from 'common/entities/pessoa/pessoa.entity';
import LoginUC from './usecases/user/login.usecase';
import UpdateUserUC from './usecases/user/update-user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa])],
  providers: [CreateUserUC, LoginUC, AuthService, UserRepository, UpdateUserUC],
  controllers: [UserController],
})
export default class UserModule {}
