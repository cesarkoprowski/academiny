import { Body, Controller, Inject, Post } from '@nestjs/common';
import CreateCoordinatorRequestDTO from '../../admin/dto/request/create-coordinator.request.dto';
import CreateCoordinatorUC from '../../admin/usecase/admin/create-coordinator.usecase';
import CreateTeacherRequestDTO from '../../admin/dto/request/create-teacher.request.dto';
import CreateTeacherUC from '../../admin/usecase/admin/create-teacher.usecase';

@Controller('admin')
export default class AdminController {
  constructor(
    @Inject(CreateCoordinatorUC)
    private readonly createCoordinatorUC: CreateCoordinatorUC,
    @Inject(CreateTeacherUC)
    private readonly createTeacherUC: CreateTeacherUC,
  ) {}

  @Post('coordinator')
  async createCoordinator(
    @Body() createCoordinator: CreateCoordinatorRequestDTO,
  ) {
    return await this.createCoordinatorUC.execute(createCoordinator);
  }

  @Post('teacher')
  async createTeacher(@Body() createTeacher: CreateTeacherRequestDTO) {
    return await this.createTeacherUC.execute(createTeacher);
  }
}
