import { ApiProperty } from '@nestjs/swagger';

export default class GetDisciplinasAlunoResponseDto {
  @ApiProperty({ description: 'ID da disciplina', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Id do Aluno',
    example: '5',
  })
  alunoId: number;

  @ApiProperty({
    description: 'Disciplina ID',
    example: '23',
  })
  disciplinaId: number;

  @ApiProperty({
    description: 'Ano cursado',
    example: '2025',
  })
  anoCursado: number;

  @ApiProperty({ description: 'Semestre', example: '1' })
  anoSemestre: 1 | 2;

  @ApiProperty({
    description: 'Carga horária da disciplina concluida',
    example: 80,
  })
  horasExtensaoConcluida: number;

  @ApiProperty({ description: 'Status da matrícula', example: 'Cursando' })
  status: 'Aprovado' | 'Reprovado' | 'Cursando';
}
