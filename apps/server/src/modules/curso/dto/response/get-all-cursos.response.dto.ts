import { ApiProperty } from '@nestjs/swagger';
import { Modalidade } from '../../enum/modalidade.enum';
import { Turno } from '../../enum/turno.enum';

export default class GetAllCursosResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Análise e Desenvolvimento de Sistemas' })
  nome: string;

  @ApiProperty({ example: Modalidade.PRESENCIAL, enum: Modalidade })
  modalidade: Modalidade;

  @ApiProperty({ example: Turno.NOTURNO, enum: Turno })
  turno: Turno;

  @ApiProperty({ example: 40 })
  vagas: number;

  @ApiProperty({ example: 200 })
  cargaHorariaExtensao: number;
}
