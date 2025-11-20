import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import CursoRequestCreateDto from '../dto/request/curso-create.request.dto';
import CursoResponseCreateDto from '../dto/response/curso-create.response.dto';
import CreateCursoUC from '../usecase/create-curso.usecase';
import { Admin } from 'common/decorators/public.decorator';
import AuthGuardCoordinator from 'common/security/auth/entity/auth.coordinator.guard';
import CreateLinkDisciplineRequestDTO from '../dto/request/create-link-discipline.request.dto';
import CreateLinkDisciplineUC from '../usecase/create-link-discipline.usecase';
import CreateLinkDisciplineResponseDTO from '../dto/response/create-link-discipline.response.dto';

@ApiTags('curso')
@Controller('curso')
export default class CursoController {
  constructor(
    @Inject(CreateCursoUC)
    private readonly createCursoUC: CreateCursoUC,

    @Inject(CreateLinkDisciplineUC)
    private readonly linkDisciplineUC: CreateLinkDisciplineUC,
  ) {}

  @Admin()
  @Post()
  @ApiOperation({ summary: '[Admin Apenas] Criar um novo curso' })
  @ApiResponse({
    status: 201,
    description: 'Curso criado com sucesso',
    type: CursoResponseCreateDto,
  })
  async createCurso(
    @Body() cursoCreateDto: CursoRequestCreateDto,
  ): Promise<CursoResponseCreateDto> {
    return await this.createCursoUC.execute(cursoCreateDto);
  }

  @UseGuards(AuthGuardCoordinator)
  @Post('link-discipline')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '[Coordenador Apenas] Vincular uma disciplina a um curso',
  })
  @ApiResponse({
    status: 201,
    description: 'Disciplina vinculada ao curso com sucesso',
    type: CreateLinkDisciplineResponseDTO,
  })
  async linkDisciplineToCourse(
    @Body() linkDisciplineDto: CreateLinkDisciplineRequestDTO,
  ): Promise<CreateLinkDisciplineResponseDTO> {
    return await this.linkDisciplineUC.execute(linkDisciplineDto);
  }
}
