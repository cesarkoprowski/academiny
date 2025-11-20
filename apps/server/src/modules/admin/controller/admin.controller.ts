import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import CreateCoordinatorRequestDTO from '../../admin/dto/request/create-coordinator.request.dto';
import CreateCoordinatorUC from '../../admin/usecase/admin/create-coordinator.usecase';
import { Admin } from 'common/decorators/public.decorator';
import DeleteCoordinatorUC from '../usecase/delete-coordinator.usecase';

@ApiTags('admin')
@ApiBearerAuth('JWT-auth')
@Controller('admin')
export default class AdminController {
  constructor(
    @Inject(CreateCoordinatorUC)
    private readonly createCoordinatorUC: CreateCoordinatorUC,
    @Inject(DeleteCoordinatorUC)
    private readonly deleteCoordinatorUC: DeleteCoordinatorUC,
  ) {}

  @Admin()
  @Post('coordinator')
  @ApiOperation({ summary: '[Admin Apenas] Criar um novo coordenador' })
  @ApiResponse({ status: 201, description: 'Coordenador criado com sucesso' })
  async createCoordinator(
    @Body() createCoordinator: CreateCoordinatorRequestDTO,
  ) {
    return await this.createCoordinatorUC.execute(createCoordinator);
  }

  @Admin()
  @Delete('coordinator/:id')
  @HttpCode(204)
  @ApiOperation({ summary: '[Admin Apenas] Deletar um coordenador' })
  @ApiResponse({ status: 204, description: 'Coordenador deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Coordenador não encontrado' })
  async deleteCoordinator(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.deleteCoordinatorUC.execute(id);
  }
}
