import { IsNumber } from 'class-validator';

export default class CreateCoordinatorResponseDTO {
  @IsNumber()
  coordenadorId: number;

  @IsNumber()
  cursoId: number;

  @IsNumber()
  professorId: number;
}
