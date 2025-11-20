import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import CreateAlunoUC from '../usecase/create-aluno.use.case';
import GetAllProfessorsUC from '../usecase/get-all-professors.usecase';
import AlunoCreateRequestDTO from '../dto/request/create-aluno.request.dto';
import GetAllProfessorsResponseDto from '../dto/response/get-all-professors.response.dto';
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

  @Post('aluno')
  @UseGuards(AuthGuardTeacher)
  @ApiOperation({ summary: '[Professor Apenas] Criar um novo aluno' })
  @ApiResponse({ status: 201, description: 'Aluno criado com sucesso' })
  async createAluno(@Body() createCoordinator: AlunoCreateRequestDTO) {
    return await this.createAlunoUC.execute(createCoordinator);
  }
}
