import { ApiProperty } from '@nestjs/swagger';

export default class GetCursoByIdResponseDto {
  @ApiProperty({ description: 'ID do curso', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Nome do curso',
    example: 'Ciência da Computação',
  })
  nome: string;

  @ApiProperty({
    description: 'Descrição do curso',
    example: 'Graduação em Ciência da Computação',
  })
  descricao: string;

  @ApiProperty({ description: 'Carga horária do curso', example: 3200 })
  cargaHoraria: number;

  @ApiProperty({ description: 'ID do coordenador responsável', example: 1 })
  coordenadorId: number;

  @ApiProperty({
    description: 'Data de criação do curso',
    example: '2024-01-15T10:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do curso',
    example: '2024-01-15T10:30:00Z',
  })
  updatedAt: Date;
}
