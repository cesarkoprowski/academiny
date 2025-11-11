import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import CreateTeacherRequestDTO from 'modules/admin/dto/request/create-teacher.request.dto';
import CreateTeacherUC from '../usecase/create-teacher.usecase';
import AuthGuardCoordinator from 'common/security/auth/entity/auth.coordinator.guard';

@Controller('coordenador')
@UseGuards(AuthGuardCoordinator)
export default class CoordinatorController {
  constructor(
    @Inject(CreateTeacherUC)
    private readonly createTeacherUC: CreateTeacherUC,
  ) {}
  @Post('teacher')
  async createTeacher(@Body() createTeacher: CreateTeacherRequestDTO) {
    return await this.createTeacherUC.execute(createTeacher);
  }
}
