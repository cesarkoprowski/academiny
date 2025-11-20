import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import DisciplinaCreateRequestDto from '../dto/request/disciplina-create.request.dto';
import DisciplinaCreateResponseDto from '../dto/response/disciplina-create.response.dto';
import CreateDisciplinaUC from '../usecase/create-disciplina.usecase';
import AuthGuardCoordinator from 'common/security/auth/entity/auth.coordinator.guard';

@ApiTags('disciplina')
@ApiBearerAuth('JWT-auth')
@Controller('disciplina')
@UseGuards(AuthGuardCoordinator)
export default class DisciplinaController {
  constructor(
    @Inject(CreateDisciplinaUC)
    private readonly createDisciplinaUC: CreateDisciplinaUC,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova disciplina' })
  @ApiResponse({
    status: 201,
    description: 'Disciplina criada com sucesso',
    type: DisciplinaCreateResponseDto,
  })
  async createDisciplina(
    @Body() disciplinaCreateDto: DisciplinaCreateRequestDto,
  ): Promise<DisciplinaCreateResponseDto> {
    return await this.createDisciplinaUC.execute(disciplinaCreateDto);
  }
}
