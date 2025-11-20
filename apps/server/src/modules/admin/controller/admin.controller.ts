import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateCoordinatorRequestDTO from '../../admin/dto/request/create-coordinator.request.dto';
import CreateCoordinatorUC from '../../admin/usecase/admin/create-coordinator.usecase';
import { Admin } from 'common/decorators/public.decorator';

@ApiTags('admin')
@Controller('admin')
export default class AdminController {
  constructor(
    @Inject(CreateCoordinatorUC)
    private readonly createCoordinatorUC: CreateCoordinatorUC,
  ) {}

  @Admin()
  @Post('coordinator')
  @ApiOperation({ summary: 'Criar um novo coordenador (Admin apenas)' })
  @ApiResponse({ status: 201, description: 'Coordenador criado com sucesso' })
  async createCoordinator(
    @Body() createCoordinator: CreateCoordinatorRequestDTO,
  ) {
    return await this.createCoordinatorUC.execute(createCoordinator);
  }
}
