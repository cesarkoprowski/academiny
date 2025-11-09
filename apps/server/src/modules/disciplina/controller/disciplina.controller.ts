import { Body, Controller, Inject, Post } from '@nestjs/common';
import DisciplinaCreateRequestDto from '../dto/request/disciplina-create.request.dto';
import DisciplinaCreateResponseDto from '../dto/response/disciplina-create.response.dto';
import CreateDisciplinaUC from '../usecase/create-disciplina.usecase';

@Controller('disciplina')
export default class DisciplinaController {
  constructor(
    @Inject(CreateDisciplinaUC)
    private readonly createDisciplinaUC: CreateDisciplinaUC,
  ) { }

  @Post()
  async createDisciplina(@Body() disciplinaCreateDto: DisciplinaCreateRequestDto): Promise<DisciplinaCreateResponseDto> {
    return await this.createDisciplinaUC.execute(disciplinaCreateDto);
  }
}
