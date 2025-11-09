import { Body, Controller, Inject, Post } from '@nestjs/common';
import UserCreateRequestDTO from '../dto/request/user-create.request.dto';
import CreateUserUC from '../usecases/user/create-user.usecase';
import LoginRequestDTO from '../dto/request/login.request';
import LoginUC from '../usecases/user/login.usecase';

@Controller('user')
export default class UserController {
  constructor(
    @Inject(CreateUserUC)
    private createUserUC: CreateUserUC,
    @Inject(LoginUC)
    private loginUserUC: LoginUC,
  ) {}

  @Post('')
  async createUser(@Body() user: UserCreateRequestDTO) {
    return this.createUserUC.execute(user);
  }

  @Post('login')
  async loginUser(@Body() user: LoginRequestDTO) {
    return await this.loginUserUC.execute(user);
  }
}
