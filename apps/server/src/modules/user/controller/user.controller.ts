import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import UserCreateRequestDTO from '../dto/request/user-create.request.dto';
import CreateUserUC from '../usecases/user/create-user.usecase';
import LoginRequestDTO from '../dto/request/login.request';
import LoginUC from '../usecases/user/login.usecase';
import { Public } from 'common/decorators/public.decorator';
import type { AuthenticatedRequest } from 'common/types/authenticated.request';
import { UserJwt } from 'common/security/auth/type/user-jwt.type';
import UpdateUserUC from '../usecases/user/update-user.usecase';
import UpdateUserRequestDTO from '../dto/request/user-create.request.dto copy';

@ApiTags('user')
@Controller('user')
export default class UserController {
  constructor(
    private createUserUC: CreateUserUC,
    private loginUserUC: LoginUC,
    private updateUser: UpdateUserUC,
  ) {}

  @Public()
  @Post('')
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  async createUser(@Body() user: UserCreateRequestDTO) {
    return this.createUserUC.execute(user);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Realizar login no sistema' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  async loginUser(@Body() user: LoginRequestDTO) {
    return await this.loginUserUC.execute(user);
  }

  @Put('update')
  @HttpCode(204)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Atualizar dados do usuário autenticado' })
  @ApiResponse({ status: 204, description: 'Usuário atualizado com sucesso' })
  async updateMe(
    @Req() request: AuthenticatedRequest,
    @Body() userUpdateDto: UpdateUserRequestDTO,
  ) {
    const user = this.checkUserHelper(request);

    return await this.updateUser.execute({
      id: user.userId,
      input: userUpdateDto,
    });
  }

  private checkUserHelper(request: AuthenticatedRequest) {
    const user: UserJwt = request['x-user'];

    if (!user) throw new NotFoundException();

    return user;
  }
}
