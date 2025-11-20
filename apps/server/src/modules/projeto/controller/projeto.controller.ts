import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import ProjetoExtensaoCreateRequestDto from '../dto/request/projeto-create.request.dto';
import ProjetoExtensaoCreateResponseDto from '../dto/response/projeto-create.response.dto';
import ProjetoExtensaoCreateUC from '../usecase/projeto-create.usecase';
import AuthGuardAluno from 'common/security/auth/entity/auth.aluno.guard';

@ApiTags('projeto')
@ApiBearerAuth('JWT-auth')
@Controller('projeto')
@UseGuards(AuthGuardAluno)
export default class ProjetoExtensaoController {
  constructor(
    @Inject(ProjetoExtensaoCreateUC)
    private readonly projetoExtensaoCreateUC: ProjetoExtensaoCreateUC,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo projeto de extensão' })
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
}
