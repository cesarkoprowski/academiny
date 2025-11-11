import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import CreateAlunoUC from '../usecase/create-aluno.use.case';
import AlunoCreateRequestDTO from '../dto/request/create-aluno.request.dto';
import AuthGuardTeacher from 'common/security/auth/entity/auth.teacher.guard';

@Controller('professor')
@UseGuards(AuthGuardTeacher)
export default class TeacherController {
  constructor(
    @Inject(CreateAlunoUC)
    private readonly createAlunoUC: CreateAlunoUC,
  ) {}

  @Post('aluno')
  async createAluno(@Body() createCoordinator: AlunoCreateRequestDTO) {
    return await this.createAlunoUC.execute(createCoordinator);
  }
}
