import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class DisciplinaUpdateRequestDto {
  @ApiProperty({
    description: 'Nome da disciplina',
    example: 'Programação Orientada a Objetos - Avançado',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nome?: string;

  @ApiProperty({
    description: 'Código da disciplina',
    example: 'CC301A',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  codigo?: string;

  @ApiProperty({
    description: 'Carga horária de extensão da disciplina em horas',
    example: 30,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  cargaHorariaExtensao?: number;
}
