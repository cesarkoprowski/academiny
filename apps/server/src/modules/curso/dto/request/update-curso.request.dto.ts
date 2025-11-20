import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';
import { Modalidade } from '../../enum/modalidade.enum';
import { Turno } from '../../enum/turno.enum';

export default class UpdateCursoRequestDto {
  @ApiProperty({
    example: 'Análise e Desenvolvimento de Sistemas',
    required: false,
  })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({
    example: Modalidade.PRESENCIAL,
    enum: Modalidade,
    required: false,
  })
  @IsOptional()
  @IsEnum(Modalidade)
  modalidade?: Modalidade;

  @ApiProperty({ example: Turno.NOTURNO, enum: Turno, required: false })
  @IsOptional()
  @IsEnum(Turno)
  turno?: Turno;

  @ApiProperty({ example: 40, required: false })
  @IsOptional()
  @IsNumber()
  vagas?: number;

  @ApiProperty({ example: 200, required: false })
  @IsOptional()
  @IsNumber()
  cargaHorariaExtensao?: number;
}
