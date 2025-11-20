import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class AddProfessorToDisciplinaRequestDto {
  @ApiProperty({
    description: 'ID do professor',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  professorId: number;

  @ApiProperty({
    description: 'ID da disciplina',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  disciplinaId: number;
}
