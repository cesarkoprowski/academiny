import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateCoordinatorRequestDTO {
  @ApiProperty({
    description: 'ID do curso que o coordenador irá coordenar',
    example: 1,
  })
  @IsNumber()
  cursoId: number;

  @ApiProperty({
    description: 'ID do professor que se tornará coordenador',
    example: 1,
  })
  @IsNumber()
  professorId: number;
}
