import {
  Body,
  Controller,
  Get,
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
import ForgotPasswordUC from '../usecases/user/forgot-password.usecase';
import ResetPasswordUC from '../usecases/user/reset-password.usecase';
import ForgotPasswordRequestDto from '../dto/request/forgot-password.request.dto';
import ResetPasswordRequestDto from '../dto/request/reset-password.request.dto';
import MessageResponseDto from '../dto/response/message.response.dto';
import GetMeUC from '../usecases/user/get-me.usecase';

@ApiTags('user')
@Controller('user')
export default class UserController {
  constructor(
    private createUserUC: CreateUserUC,
    private loginUserUC: LoginUC,
    private updateUser: UpdateUserUC,
    private forgotPasswordUC: ForgotPasswordUC,
    private resetPasswordUC: ResetPasswordUC,
    private getMeUC: GetMeUC,
  ) {}

  @Public()
  @Post('')
  @ApiOperation({ summary: '[Público] Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  async createUser(@Body() user: UserCreateRequestDTO) {
    return this.createUserUC.execute(user);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: '[Público] Realizar login no sistema' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  async loginUser(@Body() user: LoginRequestDTO) {
    return await this.loginUserUC.execute(user);
  }

  @Put('update')
  @HttpCode(204)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '[Autenticado] Atualizar dados do usuário autenticado',
  })
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

  @Get('get-me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '[Autenticado] Trazer dados do usuário autenticado',
  })
  @ApiResponse({ status: 200, description: 'Usuário buscado com sucesso' })
  async getMe(@Req() request: AuthenticatedRequest) {
    const user = this.checkUserHelper(request);
    return await this.getMeUC.execute(user.userId);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(200)
  @ApiOperation({
    summary: '[Público] Solicitar recuperação de senha por email',
  })
  @ApiResponse({
    status: 200,
    description: 'Código de recuperação enviado por email',
    type: MessageResponseDto,
  })
  async forgotPassword(
    @Body() input: ForgotPasswordRequestDto,
  ): Promise<MessageResponseDto> {
    return await this.forgotPasswordUC.execute(input);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(200)
  @ApiOperation({
    summary: '[Público] Resetar senha usando código de verificação',
  })
  @ApiResponse({
    status: 200,
    description: 'Senha atualizada com sucesso',
    type: MessageResponseDto,
  })
  async resetPassword(
    @Body() input: ResetPasswordRequestDto,
  ): Promise<MessageResponseDto> {
    return await this.resetPasswordUC.execute(input);
  }

  private checkUserHelper(request: AuthenticatedRequest) {
    const user: UserJwt = request['x-user'];

    if (!user) throw new NotFoundException();

    return user;
  }
}
