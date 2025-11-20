import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export default class EnrollAlunoDisciplinaRequestDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  alunoId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  disciplinaId: number;

  @ApiProperty({ example: 2024 })
  @IsNumber()
  anoCursado: number;

  @ApiProperty({ example: 1, description: '1 ou 2' })
  @IsNumber()
  anoSemestre: 1 | 2;
}
