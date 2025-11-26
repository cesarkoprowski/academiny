import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import ProjetoExtensaoCreateRequestDto from '../dto/request/projeto-create.request.dto';
import ProjetoExtensaoUpdateRequestDto from '../dto/request/projeto-update.request.dto';
import DeniedProjectRequestDTO from '../dto/request/projeto-denied.request.dto';
import ProjetoExtensaoCreateResponseDto from '../dto/response/projeto-create.response.dto';
import ProjetoExtensaoUpdateUC from '../usecase/projeto-update.usecase';
import ProjetoExtensaoDeleteUC from '../usecase/projeto-delete.usecase';
import ProjetoExtensaoGetAllUC from '../usecase/projeto-get-all.usecase';
import AcceptProjetoUC from '../usecase/projeto-accept.usecase';
import DeniedProjetoUC from '../usecase/projeto-denied.usecase';
import AuthGuardAluno from 'common/security/auth/entity/auth.aluno.guard';
import AuthGuardTeacher from 'common/security/auth/entity/auth.teacher.guard';
import { Public } from 'common/decorators/public.decorator';
import type { AuthenticatedRequest } from 'common/types/authenticated.request';
import { UserJwt } from 'common/security/auth/type/user-jwt.type';
import AlunoRepository from 'infra/repository/aluno.repository.imp';
import ProjetoExtensaoCreateUC from '../usecase/projeto-create.usecase';

@ApiTags('projeto')
@Controller('projeto')
export default class ProjetoExtensaoController {
  constructor(
    @Inject(ProjetoExtensaoCreateUC)
    private readonly projetoExtensaoCreateUC: ProjetoExtensaoCreateUC,
    @Inject(ProjetoExtensaoUpdateUC)
    private readonly projetoExtensaoUpdateUC: ProjetoExtensaoUpdateUC,
    @Inject(ProjetoExtensaoDeleteUC)
    private readonly projetoExtensaoDeleteUC: ProjetoExtensaoDeleteUC,
    @Inject(ProjetoExtensaoGetAllUC)
    private readonly projetoExtensaoGetAllUC: ProjetoExtensaoGetAllUC,
    @Inject(AcceptProjetoUC)
    private readonly acceptProjetoUC: AcceptProjetoUC,
    @Inject(DeniedProjetoUC)
    private readonly deniedProjetoUC: DeniedProjetoUC,
    @Inject(AlunoRepository)
    private readonly alunoRepository: AlunoRepository,
  ) {}

  @Public()
  @Get()
  @ApiOperation({ summary: '[Público] Buscar todos os projetos de extensão' })
  @ApiResponse({
    status: 200,
    description: 'Lista de projetos retornada com sucesso',
    type: [ProjetoExtensaoCreateResponseDto],
  })
  async getAllProjetos(): Promise<ProjetoExtensaoCreateResponseDto[]> {
    return await this.projetoExtensaoGetAllUC.execute();
  }

  @Delete(':id')
  @UseGuards(AuthGuardAluno)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(204)
  @ApiOperation({ summary: '[Aluno Apenas] Deletar um projeto de extensão' })
  @ApiParam({
    name: 'id',
    description: 'ID do projeto de extensão',
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: 'Projeto deletado com sucesso',
  })
  async deleteProjeto(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    const aluno = await this.checkAlunoHelper(req);

    return await this.projetoExtensaoDeleteUC.execute({
      id,
      alunoId: aluno.pessoa.id,
    });
  }

  @Post(':id/aprovar')
  @UseGuards(AuthGuardTeacher)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(204)
  @ApiOperation({
    summary: '[Professor Apenas] Aprovar um projeto de extensão',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do projeto de extensão',
    example: 1,
  })
  async aprovarProjeto(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.acceptProjetoUC.execute(id);
  }

  @Post(':id/reprovar')
  @UseGuards(AuthGuardTeacher)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(204)
  @ApiOperation({
    summary: '[Professor Apenas] Reprovar um projeto de extensão',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do projeto de extensão',
    example: 1,
  })
  async reprovarProjeto(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DeniedProjectRequestDTO,
  ): Promise<void> {
    return await this.deniedProjetoUC.execute({
      projectId: id,
      reason: dto.reason,
    });
  }

  private async checkAlunoHelper(request: AuthenticatedRequest) {
    const user: UserJwt = request['x-user'];

    const userBD = await this.alunoRepository.getById(user.userId);

    if (!userBD) throw new NotFoundException();

    return userBD;
  }
}
