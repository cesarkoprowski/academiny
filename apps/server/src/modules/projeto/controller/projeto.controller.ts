import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import ProjetoExtensaoCreateRequestDto from '../dto/request/projeto-create.request.dto';
import ProjetoExtensaoCreateResponseDto from '../dto/response/projeto-create.response.dto';
import ProjetoExtensaoCreateUC from '../usecase/projeto-create.usecase';
import AuthGuardAluno from 'common/security/auth/entity/auth.aluno.guard';

@Controller('projeto')
@UseGuards(AuthGuardAluno)
export default class ProjetoExtensaoController {
  constructor(
    @Inject(ProjetoExtensaoCreateUC)
    private readonly projetoExtensaoCreateUC: ProjetoExtensaoCreateUC,
  ) {}

  @Post()
  async createProjeto(
    @Body() projetoCreateDto: ProjetoExtensaoCreateRequestDto,
  ): Promise<ProjetoExtensaoCreateResponseDto> {
    return await this.projetoExtensaoCreateUC.execute(projetoCreateDto);
  }
}
