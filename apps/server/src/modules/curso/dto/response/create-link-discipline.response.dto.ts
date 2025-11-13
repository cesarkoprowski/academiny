import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class CreateLinkDisciplineResponseDTO {
  @IsNumber()
  @IsNotEmpty()
  courseId: number;

  @IsNumber()
  @IsNotEmpty()
  disciplineId: number;
}
