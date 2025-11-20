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
import AtividadeExtensaoCreateRequestDto from '../dto/request/atividade-create.request.dto';
import AtividadeExtensaoUpdateRequestDto from '../dto/request/atividade-update.request.dto';
import AtividadeExtensaoCreateResponseDto from '../dto/response/atividade-create.response.dto';
import AtividadeExtensaoCreateUC from '../usecase/atividade-create.usecase';
import AtividadeExtensaoUpdateUC from '../usecase/atividade-update.usecase';
import AtividadeExtensaoDeleteUC from '../usecase/atividade-delete.usecase';
import AtividadeExtensaoGetAllUC from '../usecase/atividade-get-all.usecase';
import AtividadeExtensaoGetByIdUC from '../usecase/atividade-get-by-id.usecase';
import AuthGuardCoordinator from 'common/security/auth/entity/auth.coordinator.guard';
import { Public } from 'common/decorators/public.decorator';

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
    @Inject(AtividadeExtensaoGetAllUC)
    private readonly atividadeExtensaoGetAllUC: AtividadeExtensaoGetAllUC,
    @Inject(AtividadeExtensaoGetByIdUC)
    private readonly atividadeExtensaoGetByIdUC: AtividadeExtensaoGetByIdUC,
  ) {}

  @Public()
  @Get()
  @ApiOperation({
    summary: '[Público] Buscar todas as atividades de extensão',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de atividades retornada com sucesso',
    type: [AtividadeExtensaoCreateResponseDto],
  })
  async getAllAtividades(): Promise<AtividadeExtensaoCreateResponseDto[]> {
    return await this.atividadeExtensaoGetAllUC.execute();
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: '[Público] Buscar uma atividade de extensão por ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da atividade de extensão',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Atividade retornada com sucesso',
    type: AtividadeExtensaoCreateResponseDto,
  })
  async getAtividadeById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AtividadeExtensaoCreateResponseDto> {
    return await this.atividadeExtensaoGetByIdUC.execute(id);
  }

  @Post()
  @UseGuards(AuthGuardCoordinator)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '[Coordenador Apenas] Criar uma nova atividade de extensão',
  })
  @ApiResponse({
    status: 201,
    description: 'Atividade criada com sucesso',
    type: AtividadeExtensaoCreateResponseDto,
  })
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
}
