import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import DisciplinaCreateRequestDto from '../dto/request/disciplina-create.request.dto';
import DisciplinaUpdateRequestDto from '../dto/request/disciplina-update.request.dto';
import DisciplinaCreateResponseDto from '../dto/response/disciplina-create.response.dto';
import CreateDisciplinaUC from '../usecase/create-disciplina.usecase';
import DisciplinaUpdateUC from '../usecase/disciplina-update.usecase';
import DisciplinaDeleteUC from '../usecase/disciplina-delete.usecase';
import GetAllDisciplinaUC from '../usecase/get-all-disciplina.usecase';
import GetDisciplinaByIdUC from '../usecase/get-disciplina-by-id.usecase';
import AuthGuardCoordinator from 'common/security/auth/entity/auth.coordinator.guard';
import AuthGuardAluno from 'common/security/auth/entity/auth.aluno.guard';
import { Public } from 'common/decorators/public.decorator';
import AddProfessorToDisciplinaUC from '../usecase/add-professor-disciplina.usecase';
import AddProfessorToDisciplinaRequestDto from '../dto/request/add-professor-disciplina.request.dto';
import MessageResponseDto from 'modules/user/dto/response/message.response.dto';
import RemoveProfessorFromDisciplinaUC from '../usecase/remove-professor-disciplina.usecase';
import RemoveProfessorFromDisciplinaRequestDto from '../dto/request/remove-professor-disciplina.request.dto';
import EnrollAlunoDisciplinaUC from '../usecase/enroll-aluno-disciplina.usecase';
import UnenrollAlunoDisciplinaUC from '../usecase/unenroll-aluno-disciplina.usecase';
import GetDisciplinasAlunoUC from '../usecase/get-disciplinas-aluno.usecase';
import EnrollAlunoDisciplinaRequestDto from '../dto/request/enroll-aluno-disciplina.request.dto';
import UnenrollAlunoDisciplinaRequestDto from '../dto/request/unenroll-aluno-disciplina.request.dto';
import GetDisciplinasAlunoResponseDto from '../dto/response/get-disciplinas-aluno.response.dto';

@ApiTags('disciplina')
@Controller('disciplina')
export default class DisciplinaController {
  constructor(
    @Inject(CreateDisciplinaUC)
    private readonly createDisciplinaUC: CreateDisciplinaUC,
    @Inject(DisciplinaUpdateUC)
    private readonly disciplinaUpdateUC: DisciplinaUpdateUC,
    @Inject(DisciplinaDeleteUC)
    private readonly disciplinaDeleteUC: DisciplinaDeleteUC,
    @Inject(GetAllDisciplinaUC)
    private readonly getAllDisciplinaUC: GetAllDisciplinaUC,
    @Inject(GetDisciplinaByIdUC)
    private readonly getDisciplinaByIdUC: GetDisciplinaByIdUC,
    @Inject(AddProfessorToDisciplinaUC)
    private readonly addProfessorToDisciplinaUC: AddProfessorToDisciplinaUC,
    @Inject(RemoveProfessorFromDisciplinaUC)
    private readonly removeProfessorFromDisciplinaUC: RemoveProfessorFromDisciplinaUC,
    @Inject(EnrollAlunoDisciplinaUC)
    private readonly enrollAlunoDisciplinaUC: EnrollAlunoDisciplinaUC,
    @Inject(UnenrollAlunoDisciplinaUC)
    private readonly unenrollAlunoDisciplinaUC: UnenrollAlunoDisciplinaUC,
    @Inject(GetDisciplinasAlunoUC)
    private readonly getDisciplinasAlunoUC: GetDisciplinasAlunoUC,
  ) {}

  @Public()
  @Get()
  @ApiOperation({ summary: '[Público] Buscar todas as disciplinas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de disciplinas retornada com sucesso',
    type: [DisciplinaCreateResponseDto],
  })
  async getAllDisciplinas(): Promise<DisciplinaCreateResponseDto[]> {
    return await this.getAllDisciplinaUC.execute();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: '[Público] Buscar uma disciplina por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID da disciplina',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Disciplina retornada com sucesso',
    type: DisciplinaCreateResponseDto,
  })
  async getDisciplinaById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DisciplinaCreateResponseDto> {
    return await this.getDisciplinaByIdUC.execute(id);
  }

  @Post()
  @UseGuards(AuthGuardCoordinator)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '[Coordenador Apenas] Criar uma nova disciplina' })
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

  @Patch(':id')
  @UseGuards(AuthGuardCoordinator)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(204)
  @ApiOperation({ summary: '[Coordenador Apenas] Atualizar uma disciplina' })
  @ApiParam({
    name: 'id',
    description: 'ID da disciplina',
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: 'Disciplina atualizada com sucesso',
  })
  async updateDisciplina(
    @Param('id', ParseIntPipe) id: number,
    @Body() disciplinaUpdateDto: DisciplinaUpdateRequestDto,
  ): Promise<void> {
    return await this.disciplinaUpdateUC.execute({
      id,
      input: disciplinaUpdateDto,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuardCoordinator)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(204)
  @ApiOperation({ summary: '[Coordenador Apenas] Deletar uma disciplina' })
  @ApiParam({
    name: 'id',
    description: 'ID da disciplina',
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: 'Disciplina deletada com sucesso',
  })
  async deleteDisciplina(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.disciplinaDeleteUC.execute(id);
  }

  @Post('add-professor')
  @UseGuards(AuthGuardCoordinator)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '[Coordenador Apenas] Adicionar professor a uma disciplina',
  })
  @ApiResponse({
    status: 200,
    description: 'Professor adicionado à disciplina com sucesso',
    type: MessageResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Professor ou disciplina não encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Professor já está associado a esta disciplina',
  })
  async addProfessorToDisciplina(
    @Body() input: AddProfessorToDisciplinaRequestDto,
  ): Promise<MessageResponseDto> {
    return await this.addProfessorToDisciplinaUC.execute(input);
  }

  @Post('remove-professor')
  @UseGuards(AuthGuardCoordinator)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '[Coordenador Apenas] Remover professor de uma disciplina',
  })
  @ApiResponse({
    status: 200,
    description: 'Professor removido da disciplina com sucesso',
    type: MessageResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Professor não está associado a esta disciplina',
  })
  async removeProfessorFromDisciplina(
    @Body() input: RemoveProfessorFromDisciplinaRequestDto,
  ): Promise<MessageResponseDto> {
    return await this.removeProfessorFromDisciplinaUC.execute(input);
  }

  @Post('matricular')
  @UseGuards(AuthGuardAluno)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '[Aluno Apenas] Matricular-se em uma disciplina',
  })
  @ApiResponse({
    status: 201,
    description: 'Aluno matriculado na disciplina com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Aluno ou disciplina não encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Aluno já está matriculado nesta disciplina',
  })
  async enrollAlunoDisciplina(
    @Body() input: EnrollAlunoDisciplinaRequestDto,
  ): Promise<MessageResponseDto> {
    return await this.enrollAlunoDisciplinaUC.execute(input);
  }

  @Post('desmatricular')
  @UseGuards(AuthGuardAluno)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '[Aluno Apenas] Desmatricular-se de uma disciplina',
  })
  @ApiResponse({
    status: 200,
    description: 'Aluno desmatriculado da disciplina com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Matrícula não encontrada',
  })
  async unenrollAlunoDisciplina(
    @Body() input: UnenrollAlunoDisciplinaRequestDto,
  ): Promise<MessageResponseDto> {
    return await this.unenrollAlunoDisciplinaUC.execute(input);
  }

  @Get('aluno/:alunoId')
  @UseGuards(AuthGuardAluno)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '[Aluno Apenas] Buscar disciplinas de um aluno',
  })
  @ApiParam({
    name: 'alunoId',
    description: 'ID do aluno',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Disciplinas do aluno retornadas com sucesso',
    type: [GetDisciplinasAlunoResponseDto],
  })
  async getDisciplinasAluno(
    @Param('alunoId', ParseIntPipe) alunoId: number,
  ): Promise<GetDisciplinasAlunoResponseDto[]> {
    return await this.getDisciplinasAlunoUC.execute(alunoId);
  }
}
