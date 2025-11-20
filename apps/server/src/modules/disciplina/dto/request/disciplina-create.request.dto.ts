import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class DisciplinaCreateRequestDto {
  @ApiProperty({
    description: 'Nome da disciplina',
    example: 'Programação Orientada a Objetos',
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    description: 'Código da disciplina',
    example: 'CC301',
  })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({
    description: 'Carga horária de extensão da disciplina em horas',
    example: 20,
  })
  @IsNumber()
  cargaHorariaExtensao: number;
}
