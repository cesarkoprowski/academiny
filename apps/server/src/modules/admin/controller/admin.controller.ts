import { Body, Controller, Inject, Post } from '@nestjs/common';
import CreateCoordinatorRequestDTO from '../../admin/dto/request/create-coordinator.request.dto';
import CreateCoordinatorUC from '../../admin/usecase/admin/create-coordinator.usecase';
import { Admin } from 'common/decorators/public.decorator';

@Controller('admin')
export default class AdminController {
  constructor(
    @Inject(CreateCoordinatorUC)
    private readonly createCoordinatorUC: CreateCoordinatorUC,
  ) {}

  @Admin()
  @Post('coordinator')
  async createCoordinator(
    @Body() createCoordinator: CreateCoordinatorRequestDTO,
  ) {
    return await this.createCoordinatorUC.execute(createCoordinator);
  }
}
