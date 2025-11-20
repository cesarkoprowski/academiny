import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class AtividadeExtensaoCreateRequestDto {
  @ApiProperty({
    description: 'Título da atividade de extensão',
    example: 'Projeto de Extensão em Desenvolvimento Web',
  })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({
    description: 'Descrição detalhada da atividade',
    example:
      'Atividade de extensão focada no desenvolvimento de aplicações web',
  })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({
    description: 'Carga horária da atividade de extensão em horas',
    example: 60,
  })
  @IsNumber()
  @IsNotEmpty()
  cargaHoraria: number;
}
