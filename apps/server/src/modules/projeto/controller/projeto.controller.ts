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
import ProjetoExtensaoCreateResponseDto from '../dto/response/projeto-create.response.dto';
import ProjetoExtensaoCreateUC from '../usecase/projeto-create.usecase';
import ProjetoExtensaoUpdateUC from '../usecase/projeto-update.usecase';
import ProjetoExtensaoDeleteUC from '../usecase/projeto-delete.usecase';
import ProjetoExtensaoGetAllUC from '../usecase/projeto-get-all.usecase';
import AuthGuardAluno from 'common/security/auth/entity/auth.aluno.guard';
import { Public } from 'common/decorators/public.decorator';
import type { AuthenticatedRequest } from 'common/types/authenticated.request';
import { UserJwt } from 'common/security/auth/type/user-jwt.type';
import AlunoRepository from 'infra/repository/aluno.repository.imp';

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

  @Post()
  @UseGuards(AuthGuardAluno)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '[Aluno Apenas] Criar um novo projeto de extensão' })
  @ApiResponse({
    status: 201,
    description: 'Projeto criado com sucesso',
    type: ProjetoExtensaoCreateResponseDto,
  })
  async createProjeto(
    @Body() projetoCreateDto: ProjetoExtensaoCreateRequestDto,
  ): Promise<ProjetoExtensaoCreateResponseDto> {
    return await this.projetoExtensaoCreateUC.execute(projetoCreateDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuardAluno)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(204)
  @ApiOperation({
    summary: '[Aluno Apenas] Atualizar um projeto de extensão existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do projeto de extensão',
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: 'Projeto atualizado com sucesso',
  })
  async updateProjeto(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() projetoUpdateDto: ProjetoExtensaoUpdateRequestDto,
  ): Promise<void> {
    const aluno = await this.checkAlunoHelper(req);

    return await this.projetoExtensaoUpdateUC.execute({
      id,
      input: projetoUpdateDto,
      alunoId: aluno.pessoa.id,
    });
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

  private async checkAlunoHelper(request: AuthenticatedRequest) {
    const user: UserJwt = request['x-user'];

    const userBD = await this.alunoRepository.getById(user.userId);

    if (!userBD) throw new NotFoundException();

    return userBD;
  }
}
