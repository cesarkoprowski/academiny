import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import CreateTeacherRequestDTO from 'modules/coordenador/dto/request/create-teacher.request.dto';
import CreateTeacherUC from '../usecase/create-teacher.usecase';
import GetAllCoordenadoresUC from '../usecase/get-all-coordenadores.usecase';
import GetAllCoordenadoresResponseDto from '../dto/response/get-all-coordenadores.response.dto';
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
