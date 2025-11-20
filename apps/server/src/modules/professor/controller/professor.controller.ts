import {
  Body,
  Controller,
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
import CreateAlunoUC from '../usecase/create-aluno.use.case';
import GetAllProfessorsUC from '../usecase/get-all-professors.usecase';
import GetProfessorByIdUC from '../usecase/get-professor-by-id.usecase';
import UpdateProfessorUC from '../usecase/update-professor.usecase';
import AlunoCreateRequestDTO from '../dto/request/create-aluno.request.dto';
import GetAllProfessorsResponseDto from '../dto/response/get-all-professors.response.dto';
import GetProfessorByIdResponseDto from '../dto/response/get-professor-by-id.response.dto';
import UpdateProfessorRequestDto from '../dto/request/update-professor.request.dto';
import AuthGuardTeacher from 'common/security/auth/entity/auth.teacher.guard';
import AuthGuardCoordinator from 'common/security/auth/entity/auth.coordinator.guard';

@ApiTags('professor')
@ApiBearerAuth('JWT-auth')
@Controller('professor')
export default class TeacherController {
  constructor(
    @Inject(CreateAlunoUC)
    private readonly createAlunoUC: CreateAlunoUC,
    @Inject(GetAllProfessorsUC)
    private readonly getAllProfessorsUC: GetAllProfessorsUC,
    @Inject(GetProfessorByIdUC)
    private readonly getProfessorByIdUC: GetProfessorByIdUC,
    @Inject(UpdateProfessorUC)
    private readonly updateProfessorUC: UpdateProfessorUC,
  ) {}

  @Get()
  @UseGuards(AuthGuardCoordinator)
  @ApiOperation({ summary: '[Coordenador Apenas] Buscar todos os professores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de professores retornada com sucesso',
    type: [GetAllProfessorsResponseDto],
  })
  async getAllProfessors(): Promise<GetAllProfessorsResponseDto[]> {
    return await this.getAllProfessorsUC.execute();
  }

  @Get(':id')
  @UseGuards(AuthGuardCoordinator)
  @ApiOperation({ summary: '[Coordenador Apenas] Buscar professor por ID' })
  @ApiParam({ name: 'id', description: 'ID do professor', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Professor encontrado',
    type: GetProfessorByIdResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Professor não encontrado' })
  async getProfessorById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetProfessorByIdResponseDto> {
    return await this.getProfessorByIdUC.execute(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuardCoordinator)
  @HttpCode(204)
  @ApiOperation({ summary: '[Coordenador Apenas] Atualizar professor' })
  @ApiParam({ name: 'id', description: 'ID do professor', example: 1 })
  @ApiResponse({ status: 204, description: 'Professor atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Professor não encontrado' })
  async updateProfessor(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProfessorRequestDto,
  ): Promise<void> {
    return await this.updateProfessorUC.execute({ id, data });
  }

  @Post('aluno')
  @UseGuards(AuthGuardTeacher)
  @ApiOperation({ summary: '[Professor Apenas] Criar um novo aluno' })
  @ApiResponse({ status: 201, description: 'Aluno criado com sucesso' })
  async createAluno(@Body() createCoordinator: AlunoCreateRequestDTO) {
    return await this.createAlunoUC.execute(createCoordinator);
  }
}
