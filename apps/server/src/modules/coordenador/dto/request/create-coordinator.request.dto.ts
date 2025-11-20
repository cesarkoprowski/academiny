import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export default class CreateCoordinatorRequestDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  cursoId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  professorId: number;
}
