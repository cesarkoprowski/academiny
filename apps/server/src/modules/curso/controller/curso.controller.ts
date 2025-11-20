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
import CursoRequestCreateDto from '../dto/request/curso-create.request.dto';
import CursoResponseCreateDto from '../dto/response/curso-create.response.dto';
import GetAllCursosResponseDto from '../dto/response/get-all-cursos.response.dto';
import UpdateCursoRequestDto from '../dto/request/update-curso.request.dto';
import CreateCursoUC from '../usecase/create-curso.usecase';
import GetAllCursosUC from '../usecase/get-all-cursos.usecase';
import UpdateCursoUC from '../usecase/update-curso.usecase';
import DeleteCursoUC from '../usecase/delete-curso.usecase';
import { Admin } from 'common/decorators/public.decorator';
import { Public } from 'common/decorators/public.decorator';
import AuthGuardCoordinator from 'common/security/auth/entity/auth.coordinator.guard';
import CreateLinkDisciplineRequestDTO from '../dto/request/create-link-discipline.request.dto';
import CreateLinkDisciplineUC from '../usecase/create-link-discipline.usecase';
import CreateLinkDisciplineResponseDTO from '../dto/response/create-link-discipline.response.dto';
import GetCursoByIdResponseDto from '../dto/response/get-curso-by-id.response.dto';
import GetCursoByIdUC from '../usecase/get-curso-by-id.usecase';

@ApiTags('curso')
@Controller('curso')
export default class CursoController {
  constructor(
    @Inject(CreateCursoUC)
    private readonly createCursoUC: CreateCursoUC,

    @Inject(CreateLinkDisciplineUC)
    private readonly linkDisciplineUC: CreateLinkDisciplineUC,

    @Inject(GetAllCursosUC)
    private readonly getAllCursosUC: GetAllCursosUC,

    @Inject(GetCursoByIdUC)
    private readonly getCursoByIdUC: GetCursoByIdUC,

    @Inject(UpdateCursoUC)
    private readonly updateCursoUC: UpdateCursoUC,

    @Inject(DeleteCursoUC)
    private readonly deleteCursoUC: DeleteCursoUC,
  ) {}

  @Public()
  @Get()
  @ApiOperation({ summary: '[Público] Buscar todos os cursos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cursos retornada com sucesso',
    type: [GetAllCursosResponseDto],
  })
  async getAllCursos(): Promise<GetAllCursosResponseDto[]> {
    return await this.getAllCursosUC.execute();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: '[Público] Buscar curso por ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do curso' })
  @ApiResponse({
    status: 200,
    description: 'Curso encontrado com sucesso',
    type: GetCursoByIdResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Curso não encontrado',
  })
  async getCursoById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetCursoByIdResponseDto> {
    return await this.getCursoByIdUC.execute(id);
  }

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

  @Admin()
  @Patch(':id')
  @HttpCode(204)
  @ApiOperation({ summary: '[Admin Apenas] Atualizar curso' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do curso' })
  @ApiResponse({
    status: 204,
    description: 'Curso atualizado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Curso não encontrado',
  })
  async updateCurso(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCursoRequestDto,
  ): Promise<void> {
    return await this.updateCursoUC.execute({ id, data: dto });
  }

  @Admin()
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: '[Admin Apenas] Deletar curso' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do curso' })
  @ApiResponse({
    status: 204,
    description: 'Curso deletado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Curso não encontrado',
  })
  async deleteCurso(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.deleteCursoUC.execute(id);
  }
}
