import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
  Body,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import AuthGuardTeacher from 'common/security/auth/entity/auth.teacher.guard';
import GetAllAlunosUC from '../usecase/get-all-alunos.usecase';
import GetAlunoByIdUC from '../usecase/get-aluno-by-id.usecase';
import UpdateAlunoUC from '../usecase/update-aluno.usecase';
import DeleteAlunoUC from '../usecase/delete-aluno.usecase';
import GetAllAlunosResponseDto from '../dto/response/get-all-alunos.response.dto';
import GetAlunoByIdResponseDto from '../dto/response/get-aluno-by-id.response.dto';
import UpdateAlunoRequestDto from '../dto/request/update-aluno.request.dto';

@ApiTags('aluno')
@ApiBearerAuth('JWT-auth')
@Controller('alunos')
@UseGuards(AuthGuardTeacher)
export default class AlunosProfessorController {
  constructor(
    @Inject(GetAllAlunosUC)
    private readonly getAllAlunosUC: GetAllAlunosUC,
    @Inject(GetAlunoByIdUC)
    private readonly getAlunoByIdUC: GetAlunoByIdUC,
    @Inject(UpdateAlunoUC)
    private readonly updateAlunoUC: UpdateAlunoUC,
    @Inject(DeleteAlunoUC)
    private readonly deleteAlunoUC: DeleteAlunoUC,
  ) {}

  @Get()
  @ApiOperation({ summary: '[Professor Apenas] Buscar todos os alunos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de alunos retornada com sucesso',
    type: [GetAllAlunosResponseDto],
  })
  async getAllAlunos(): Promise<GetAllAlunosResponseDto[]> {
    return await this.getAllAlunosUC.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: '[Professor Apenas] Buscar aluno por ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do aluno' })
  @ApiResponse({
    status: 200,
    description: 'Aluno encontrado com sucesso',
    type: GetAlunoByIdResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Aluno não encontrado',
  })
  async getAlunoById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetAlunoByIdResponseDto> {
    return await this.getAlunoByIdUC.execute(id);
  }

  @Patch(':id')
  @HttpCode(204)
  @ApiOperation({ summary: '[Professor Apenas] Atualizar aluno' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do aluno' })
  @ApiResponse({
    status: 204,
    description: 'Aluno atualizado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Aluno não encontrado',
  })
  async updateAluno(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAlunoRequestDto,
  ): Promise<void> {
    return await this.updateAlunoUC.execute({ id, data: dto });
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: '[Professor Apenas] Deletar aluno' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do aluno' })
  @ApiResponse({
    status: 204,
    description: 'Aluno deletado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Aluno não encontrado',
  })
  async deleteAluno(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.deleteAlunoUC.execute(id);
  }
}
