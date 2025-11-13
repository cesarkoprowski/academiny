import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import CursoRequestCreateDto from '../dto/request/curso-create.request.dto';
import CursoResponseCreateDto from '../dto/response/curso-create.response.dto';
import CreateCursoUC from '../usecase/create-curso.usecase';
import { Admin } from 'common/decorators/public.decorator';
import AuthGuardCoordinator from 'common/security/auth/entity/auth.coordinator.guard';
import CreateLinkDisciplineRequestDTO from '../dto/request/create-link-discipline.request.dto';
import CreateLinkDisciplineUC from '../usecase/create-link-discipline.usecase';
import CreateLinkDisciplineResponseDTO from '../dto/response/create-link-discipline.response.dto';

@Controller('curso')
export default class CursoController {
  constructor(
    @Inject(CreateCursoUC)
    private readonly createCursoUC: CreateCursoUC,

    @Inject(CreateLinkDisciplineUC)
    private readonly linkDisciplineUC: CreateLinkDisciplineUC,
  ) {}

  @Admin()
  @Post()
  async createCurso(
    @Body() cursoCreateDto: CursoRequestCreateDto,
  ): Promise<CursoResponseCreateDto> {
    return await this.createCursoUC.execute(cursoCreateDto);
  }

  @UseGuards(AuthGuardCoordinator)
  @Post('link-discipline')
  async linkDisciplineToCourse(@Body() linkDisciplineDto: CreateLinkDisciplineRequestDTO): Promise<CreateLinkDisciplineResponseDTO> {
    return await this.linkDisciplineUC.execute(linkDisciplineDto);
  }

}
