import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserJwt } from 'common/security/auth/type/user-jwt.type';
import type { AuthenticatedRequest } from 'common/types/authenticated.request';
import AlunoRepository from 'infra/repository/aluno.repository.imp';
import GetMeRequestDto from '../dto/response/get-me.aluno';
import ProjetoExtensaoRepository from 'infra/repository/projeto.repository.imp';
import type IProjetoExtensaoRepository from 'modules/projeto/repository/projeto.repository';
import SubscribeActivityUC from '../usecase/assinar-atividade.usescase';
import SubscribeAtividadeRequestDto from '../dto/request/subscribe-atividade.request.dto';
import SubscribeAtividadeResponseDto from '../dto/response/subscribe-atividade.response.dto';
import AuthGuardAluno from 'common/security/auth/entity/auth.aluno.guard';
import UnsubscribeActivityUC from '../usecase/desinscrever-atividade.usecase';
import UnsubscribeAtividadeRequestDto from '../dto/request/unsubscribe-atividade.request.dto';
import UnsubscribeAtividadeResponseDto from '../dto/response/unsubscribe-atividade.response.dto';
import CreateProjetoUC from '../usecase/create-projeto.usecase';
import CreateProjetoRequestDto from '../dto/request/create-projeto.request.dto';
import CreateProjetoResponseDto from '../dto/response/create-projeto.response.dto';
import UpdateProjetoUC from '../usecase/update-projeto.usecase';
import UpdateProjetoRequestDto from '../dto/request/update-projeto.request.dto';
import UpdateProjetoResponseDto from '../dto/response/update-projeto.response.dto';
import GetProjetosUC from '../usecase/get-projetos.usecase';
import GetProjetosResponseDto from '../dto/response/get-projetos.response.dto';

@Controller('aluno')
@UseGuards(AuthGuardAluno)
export class AlunoController {
  constructor(
    @Inject(AlunoRepository)
    private readonly repository: AlunoRepository,
    @Inject(ProjetoExtensaoRepository)
    private readonly projetoRepository: IProjetoExtensaoRepository,
    @Inject(SubscribeActivityUC)
    private readonly subscribeActivityUC: SubscribeActivityUC,
    @Inject(UnsubscribeActivityUC)
    private readonly unsubscribeActivityUC: UnsubscribeActivityUC,
    @Inject(CreateProjetoUC)
    private readonly createProjetoUC: CreateProjetoUC,
    @Inject(UpdateProjetoUC)
    private readonly updateProjetoUC: UpdateProjetoUC,
    @Inject(GetProjetosUC)
    private readonly getProjetosUC: GetProjetosUC,
  ) {}

  @Get('me')
  async getMe(
    @Req() req: AuthenticatedRequest,
  ): Promise<GetMeRequestDto | null> {
    const userBD = await this.checkAlunoHelper(req);

    return {
      cursoId: userBD.cursoId,
      cpf: userBD.pessoa.cpf,
      email: userBD.pessoa.email,
      id: userBD.id,
      matricula: userBD.matricula,
    };
  }

  @Post('atividade/inscrever')
  async subscribeActivity(
    @Req() req: AuthenticatedRequest,
    @Body() input: SubscribeAtividadeRequestDto,
  ): Promise<SubscribeAtividadeResponseDto> {
    const userBD = await this.checkAlunoHelper(req);

    return await this.subscribeActivityUC.execute({
      alunoId: userBD.pessoa.id,
      atividadeExtensaoId: input.atividadeExtensaoId,
    });
  }

  @Post('atividade/desinscrever')
  async unsubscribeActivity(
    @Req() req: AuthenticatedRequest,
    @Body() input: UnsubscribeAtividadeRequestDto,
  ): Promise<UnsubscribeAtividadeResponseDto> {
    const userBD = await this.checkAlunoHelper(req);

    return await this.unsubscribeActivityUC.execute({
      alunoId: userBD.pessoa.id,
      atividadeExtensaoId: input.atividadeExtensaoId,
    });
  }

  @Post('projeto')
  async createProjeto(
    @Req() req: AuthenticatedRequest,
    @Body() input: CreateProjetoRequestDto,
  ): Promise<CreateProjetoResponseDto> {
    const userBD = await this.checkAlunoHelper(req);

    return await this.createProjetoUC.execute(userBD.pessoa.id, input);
  }

  @Patch('projeto')
  async updateProjeto(
    @Req() req: AuthenticatedRequest,
    @Body() input: UpdateProjetoRequestDto,
  ): Promise<UpdateProjetoResponseDto> {
    const userBD = await this.checkAlunoHelper(req);

    return await this.updateProjetoUC.execute(userBD.pessoa.id, input);
  }

  @Get('projeto')
  async getProjetos(
    @Req() req: AuthenticatedRequest,
  ): Promise<GetProjetosResponseDto[]> {
    const userBD = await this.checkAlunoHelper(req);

    return await this.getProjetosUC.execute(userBD.pessoa.id);
  }

  private async checkAlunoHelper(request: AuthenticatedRequest) {
    const user: UserJwt = request['x-user'];

    const userBD = await this.repository.getById(user.userId);

    if (!userBD) throw new NotFoundException();

    return userBD;
  }
}
