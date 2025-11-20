import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class AtividadeExtensaoUpdateRequestDto {
  @ApiProperty({
    description: 'Título da atividade de extensão',
    example: 'Projeto de Extensão em Desenvolvimento Web - Atualizado',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  titulo?: string;

  @ApiProperty({
    description: 'Descrição detalhada da atividade',
    example:
      'Atividade de extensão focada no desenvolvimento de aplicações web modernas',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  descricao?: string;

  @ApiProperty({
    description: 'Carga horária da atividade de extensão em horas',
    example: 80,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  cargaHoraria?: number;
}
