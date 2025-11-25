import { ApiProperty } from '@nestjs/swagger';
import { Modalidade } from 'modules/curso/enum/modalidade.enum';
import { Turno } from 'modules/curso/enum/turno.enum';

export default class GetCursoByIdResponseDto {
  @ApiProperty({ description: 'ID do curso', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Nome do curso',
    example: 'Ciência da Computação',
  })
  nome: string;

  @ApiProperty({
    description: 'Modalidade',
    example: 'EAD',
  })
  modalidade: Modalidade;

  @ApiProperty({ description: 'Carga horária do curso', example: 3200 })
  cargaHorariaExtensao: number;

  @ApiProperty({
    description: 'Turno',
    example: 'Manhã',
  })
  turno: Turno;

  @ApiProperty({
    description: 'Vagas',
    example: '50',
  })
  vagas: number;
}
