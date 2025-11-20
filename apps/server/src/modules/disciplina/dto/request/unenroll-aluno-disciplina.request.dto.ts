import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export default class UnenrollAlunoDisciplinaRequestDto {
  @ApiProperty({ description: 'ID do aluno', example: 1 })
  @IsNotEmpty({ message: 'O ID do aluno é obrigatório' })
  @IsNumber({}, { message: 'O ID do aluno deve ser um número' })
  alunoId: number;

  @ApiProperty({ description: 'ID da disciplina', example: 1 })
  @IsNotEmpty({ message: 'O ID da disciplina é obrigatório' })
  @IsNumber({}, { message: 'O ID da disciplina deve ser um número' })
  disciplinaId: number;
}
