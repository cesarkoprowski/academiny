import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import CreateTeacherRequestDTO from 'modules/coordenador/dto/request/create-teacher.request.dto';
import CreateTeacherUC from '../usecase/create-teacher.usecase';
import AuthGuardCoordinator from 'common/security/auth/entity/auth.coordinator.guard';

@ApiTags('coordenador')
@ApiBearerAuth('JWT-auth')
@Controller('coordenador')
@UseGuards(AuthGuardCoordinator)
export default class CoordinatorController {
  constructor(
    @Inject(CreateTeacherUC)
    private readonly createTeacherUC: CreateTeacherUC,
  ) {}

  @Post('teacher')
  @ApiOperation({ summary: '[Coordenador Apenas] Criar um novo professor' })
  @ApiResponse({ status: 201, description: 'Professor criado com sucesso' })
  async createTeacher(@Body() createTeacher: CreateTeacherRequestDTO) {
    return await this.createTeacherUC.execute(createTeacher);
  }
}
