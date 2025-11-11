import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import AtividadeExtensaoCreateRequestDto from '../dto/request/atividade-create.request.dto';
import AtividadeExtensaoCreateResponseDto from '../dto/response/atividade-create.response.dto';
import AtividadeExtensaoCreateUC from '../usecase/atividade-create.usecase';
import AuthGuardCoordinator from 'common/security/auth/entity/auth.coordinator.guard';

@Controller('atividade')
@UseGuards(AuthGuardCoordinator)
export default class AtividadeExtensaoController {
  constructor(
    @Inject(AtividadeExtensaoCreateUC)
    private readonly AtividadeExtensaoCreateUC: AtividadeExtensaoCreateUC,
  ) {}

  @Post()
  async createAtividade(
    @Body() atividadeCreateDto: AtividadeExtensaoCreateRequestDto,
  ): Promise<AtividadeExtensaoCreateResponseDto> {
    return await this.AtividadeExtensaoCreateUC.execute(atividadeCreateDto);
  }
}
