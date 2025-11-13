import { IsNotEmpty, IsNumber } from "class-validator";

export default class CreateLinkDisciplineRequestDTO {
  @IsNumber()
  @IsNotEmpty()
  courseId: number;

  @IsNumber()
  @IsNotEmpty()
  disciplineId: number;
}
