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
import CreateTeacherRequestDTO from 'modules/coordenador/dto/request/create-teacher.request.dto';
import CreateTeacherUC from '../usecase/create-teacher.usecase';
import GetAllCoordenadoresUC from '../usecase/get-all-coordenadores.usecase';
import GetCoordenadorByIdUC from '../usecase/get-coordenador-by-id.usecase';
import UpdateCoordenadorUC from '../usecase/update-coordenador.usecase';
import GetAllCoordenadoresResponseDto from '../dto/response/get-all-coordenadores.response.dto';
import GetCoordenadorByIdResponseDto from '../dto/response/get-coordenador-by-id.response.dto';
import UpdateCoordenadorRequestDto from '../dto/request/update-coordenador.request.dto';
import AuthGuardCoordinator from 'common/security/auth/entity/auth.coordinator.guard';
import DeleteProfessorUC from 'modules/professor/usecase/delete-professor.usecase';
import { Admin } from 'common/decorators/public.decorator';

@ApiTags('coordenador')
@ApiBearerAuth('JWT-auth')
@Controller('coordenador')
@UseGuards(AuthGuardCoordinator)
export default class CoordinatorController {
  constructor(
    @Inject(CreateTeacherUC)
    private readonly createTeacherUC: CreateTeacherUC,
    @Inject(DeleteProfessorUC)
    private readonly deleteProfessorUC: DeleteProfessorUC,
    @Inject(GetAllCoordenadoresUC)
    private readonly getAllCoordenadoresUC: GetAllCoordenadoresUC,
    @Inject(GetCoordenadorByIdUC)
    private readonly getCoordenadorByIdUC: GetCoordenadorByIdUC,
    @Inject(UpdateCoordenadorUC)
    private readonly updateCoordenadorUC: UpdateCoordenadorUC,
  ) {}

  @Admin()
  @Get()
  @ApiOperation({ summary: '[Admin Apenas] Buscar todos os coordenadores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de coordenadores retornada com sucesso',
    type: [GetAllCoordenadoresResponseDto],
  })
  async getAllCoordenadores(): Promise<GetAllCoordenadoresResponseDto[]> {
    return await this.getAllCoordenadoresUC.execute();
  }

  @Admin()
  @Get(':id')
  @ApiOperation({ summary: '[Admin Apenas] Buscar coordenador por ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do coordenador' })
  @ApiResponse({
    status: 200,
    description: 'Coordenador encontrado com sucesso',
    type: GetCoordenadorByIdResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Coordenador não encontrado',
  })
  async getCoordenadorById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetCoordenadorByIdResponseDto> {
    return await this.getCoordenadorByIdUC.execute(id);
  }

  @Admin()
  @Patch(':id')
  @HttpCode(204)
  @ApiOperation({ summary: '[Admin Apenas] Atualizar coordenador' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do coordenador' })
  @ApiResponse({
    status: 204,
    description: 'Coordenador atualizado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Coordenador não encontrado',
  })
  async updateCoordenador(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCoordenadorRequestDto,
  ): Promise<void> {
    return await this.updateCoordenadorUC.execute({ id, data: dto });
  }

  @Post('teacher')
  @ApiOperation({ summary: '[Coordenador Apenas] Criar um novo professor' })
  @ApiResponse({ status: 201, description: 'Professor criado com sucesso' })
  async createTeacher(@Body() createTeacher: CreateTeacherRequestDTO) {
    return await this.createTeacherUC.execute(createTeacher);
  }

  @Delete('teacher/:id')
  @HttpCode(204)
  @ApiOperation({ summary: '[Coordenador Apenas] Deletar um professor' })
  @ApiResponse({ status: 204, description: 'Professor deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Professor não encontrado' })
  async deleteTeacher(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.deleteProfessorUC.execute(id);
  }
}
