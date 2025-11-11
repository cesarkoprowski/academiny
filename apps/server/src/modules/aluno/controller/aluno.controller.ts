import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { UserJwt } from 'common/security/auth/type/user-jwt.type';
import type { AuthenticatedRequest } from 'common/types/authenticated.request';
import AlunoRepository from 'infra/repository/aluno.repository.imp';
import GetMeRequestDto from '../dto/response/get-me.aluno';
import ProjetoExtensaoRepository from 'infra/repository/projeto.repository.imp';
import type IProjetoExtensaoRepository from 'modules/projeto/repository/projeto.repository';

@Controller('aluno')
export class AlunoController {
  constructor(
    @Inject(AlunoRepository)
    private readonly repository: AlunoRepository,
    @Inject(ProjetoExtensaoRepository)
    private readonly projetoRepository: IProjetoExtensaoRepository,
  ) {}

  @Get('me')
  async getMe(
    @Req() req: AuthenticatedRequest,
  ): Promise<GetMeRequestDto | null> {
    const user: UserJwt = req['x-user'];

    const userBD = await this.repository.getById(user.userId);

    if (!userBD) throw new NotFoundException();

    return {
      cursoId: userBD.cursoId,
      cpf: userBD.pessoa.cpf,
      email: userBD.pessoa.email,
      id: userBD.id,
      matricula: userBD.matricula,
    };
  }
}
