import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import AuthGuardTeacher from 'common/security/auth/entity/auth.teacher.guard';
import GetAllAlunosUC from '../usecase/get-all-alunos.usecase';
import GetAllAlunosResponseDto from '../dto/response/get-all-alunos.response.dto';

@ApiTags('aluno')
@ApiBearerAuth('JWT-auth')
@Controller('alunos')
@UseGuards(AuthGuardTeacher)
export default class AlunosProfessorController {
  constructor(
    @Inject(GetAllAlunosUC)
    private readonly getAllAlunosUC: GetAllAlunosUC,
  ) {}

  @Get()
  @ApiOperation({ summary: '[Professor Apenas] Buscar todos os alunos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de alunos retornada com sucesso',
    type: [GetAllAlunosResponseDto],
  })
  async getAllAlunos(): Promise<GetAllAlunosResponseDto[]> {
    return await this.getAllAlunosUC.execute();
  }
}
