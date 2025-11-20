import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import CreateAlunoUC from '../usecase/create-aluno.use.case';
import AlunoCreateRequestDTO from '../dto/request/create-aluno.request.dto';
import AuthGuardTeacher from 'common/security/auth/entity/auth.teacher.guard';

@ApiTags('professor')
@ApiBearerAuth('JWT-auth')
@Controller('professor')
@UseGuards(AuthGuardTeacher)
export default class TeacherController {
  constructor(
    @Inject(CreateAlunoUC)
    private readonly createAlunoUC: CreateAlunoUC,
  ) {}

  @Post('aluno')
  @ApiOperation({ summary: '[Professor Apenas] Criar um novo aluno' })
  @ApiResponse({ status: 201, description: 'Aluno criado com sucesso' })
  async createAluno(@Body() createCoordinator: AlunoCreateRequestDTO) {
    return await this.createAlunoUC.execute(createCoordinator);
  }
}
