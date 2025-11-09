import { Body, Controller, Inject, Post } from "@nestjs/common";
import AtividadeExtensaoCreateRequestDto from "../dto/request/atividade-create.request.dto";
import AtividadeExtensaoCreateResponseDto from "../dto/response/atividade-create.response.dto";
import AtividadeExtensaoCreateUC from "../usecase/atividade-create.usecase";

@Controller('atividade')
export default class AtividadeExtensaoController {
  constructor(
    @Inject(AtividadeExtensaoCreateUC)
    private readonly AtividadeExtensaoCreateUC: AtividadeExtensaoCreateUC,
  ) {}

  @Post()
  async createAtividade(@Body() atividadeCreateDto: AtividadeExtensaoCreateRequestDto): Promise<AtividadeExtensaoCreateResponseDto> {
    return await this.AtividadeExtensaoCreateUC.execute(atividadeCreateDto);
  }
}