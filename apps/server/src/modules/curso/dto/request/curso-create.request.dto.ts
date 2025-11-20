import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Modalidade } from 'modules/curso/enum/modalidade.enum';
import { Turno } from 'modules/curso/enum/turno.enum';

export default class CursoRequestCreateDto {
  @ApiProperty({
    description: 'Nome do curso',
    example: 'Ciência da Computação',
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    description: 'Modalidade do curso',
    enum: Modalidade,
    example: Modalidade.PRESENCIAL,
  })
  @IsString()
  @IsEnum(Modalidade)
  @IsNotEmpty()
  modalidade: Modalidade;

  @ApiProperty({
    description: 'Turno do curso',
    enum: Turno,
    example: Turno.MATUTINO,
  })
  @IsString()
  @IsEnum(Turno)
  @IsNotEmpty()
  turno: Turno;

  @ApiProperty({
    description: 'Número de vagas disponíveis',
    example: 40,
  })
  @IsNumber()
  vagas: number;

  @ApiProperty({
    description: 'Carga horária de extensão do curso em horas',
    example: 200,
  })
  @IsNumber()
  cargaHorariaExtensao: number;
}
