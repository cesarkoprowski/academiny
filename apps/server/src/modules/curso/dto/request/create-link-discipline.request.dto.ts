import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export default class CreateLinkDisciplineRequestDTO {
  @ApiProperty({
    description: 'ID do curso ao qual a disciplina será vinculada',
    example: 1,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  courseId: number;

  @ApiProperty({
    description: 'ID da disciplina que será vinculada ao curso',
    example: 5,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  disciplineId: number;
}
