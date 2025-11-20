import { ApiProperty } from '@nestjs/swagger';

export default class GetDisciplinasAlunoResponseDto {
  @ApiProperty({ description: 'ID da disciplina', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Nome da disciplina',
    example: 'Programação Orientada a Objetos',
  })
  nome: string;

  @ApiProperty({ description: 'Código da disciplina', example: 'POO101' })
  codigo: string;

  @ApiProperty({ description: 'Carga horária da disciplina', example: 80 })
  cargaHoraria: number;

  @ApiProperty({ description: 'Status da matrícula', example: 'Cursando' })
  status: string;

  @ApiProperty({
    description: 'Data de matrícula',
    example: '2024-01-15T10:30:00Z',
  })
  dataMatricula: Date;
}
