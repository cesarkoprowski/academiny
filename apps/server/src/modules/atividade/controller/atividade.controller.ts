import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import AtividadeExtensaoCreateUC from '../usecase/atividade-create.usecase';
import AtividadeExtensaoCreateRequestDto from '../dto/request/atividade-create.request.dto';
import AtividadeExtensaoCreateResponseDto from '../dto/response/atividade-create.response.dto';
import AtividadeExtensaoUpdateRequestDto from '../dto/request/atividade-update.request.dto';
import AuthGuardCoordinator from 'common/security/auth/entity/auth.coordinator.guard';
import AtividadeExtensaoUpdateUC from '../usecase/atividade-update.usecase';
import AtividadeExtensaoDeleteUC from '../usecase/atividade-delete.usecase';
import AtividadeExtensaoGetAllUC from '../usecase/atividade-get-all.usecase';
import GetAllAtividadesResponseDto from '../dto/response/get-all-atividades.response.dto';

@ApiTags('atividade')
@Controller('atividade')
export default class AtividadeExtensaoController {
  constructor(
    @Inject(AtividadeExtensaoCreateUC)
    private readonly atividadeExtensaoCreateUC: AtividadeExtensaoCreateUC,
    @Inject(AtividadeExtensaoUpdateUC)
    private readonly atividadeExtensaoUpdateUC: AtividadeExtensaoUpdateUC,
    @Inject(AtividadeExtensaoDeleteUC)
    private readonly atividadeExtensaoDeleteUC: AtividadeExtensaoDeleteUC,
    @Inject(AtividadeExtensaoDeleteUC)
    private readonly atividadeExtensaoGetAllUC: AtividadeExtensaoGetAllUC,
  ) {}

  @Post()
  async createAtividade(
    @Body() atividadeCreateDto: AtividadeExtensaoCreateRequestDto,
  ): Promise<AtividadeExtensaoCreateResponseDto> {
    return await this.atividadeExtensaoCreateUC.execute(atividadeCreateDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuardCoordinator)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(204)
  @ApiOperation({
    summary: '[Coordenador Apenas] Atualizar uma atividade de extensão',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da atividade de extensão',
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: 'Atividade atualizada com sucesso',
  })
  async updateAtividade(
    @Param('id', ParseIntPipe) id: number,
    @Body() atividadeUpdateDto: AtividadeExtensaoUpdateRequestDto,
  ): Promise<void> {
    return await this.atividadeExtensaoUpdateUC.execute({
      id,
      input: atividadeUpdateDto,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuardCoordinator)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(204)
  @ApiOperation({
    summary: '[Coordenador Apenas] Deletar uma atividade de extensão',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da atividade de extensão',
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: 'Atividade deletada com sucesso',
  })
  async deleteAtividade(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.atividadeExtensaoDeleteUC.execute(id);
  }

  @Get()
  async GetAll(): Promise<GetAllAtividadesResponseDto[]> {
    return await this.atividadeExtensaoGetAllUC.execute();
  }
}
