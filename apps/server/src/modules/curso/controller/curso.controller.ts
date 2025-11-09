import { Body, Controller, Inject, Post } from '@nestjs/common';
import CursoRequestCreateDto from '../dto/request/curso-create.request.dto';
import CursoResponseCreateDto from '../dto/response/curso-create.response.dto';
import CreateCursoUC from '../usecase/create-curso.usecase';

@Controller('curso')
export default class CursoController {
  constructor(
    @Inject(CreateCursoUC)
    private readonly createCursoUC: CreateCursoUC,
  ) {}

  @Post()
  async createCurso(
    @Body() cursoCreateDto: CursoRequestCreateDto,
  ): Promise<CursoResponseCreateDto> {
    return await this.createCursoUC.execute(cursoCreateDto);
  }
}
