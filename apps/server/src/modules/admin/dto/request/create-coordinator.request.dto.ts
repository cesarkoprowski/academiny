import { IsNumber } from 'class-validator';

export default class CreateCoordinatorRequestDTO {
  @IsNumber()
  cursoId: number;

  @IsNumber()
  professorId: number;
}
