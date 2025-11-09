import { IsNumber, IsString } from 'class-validator';

export default class CreateTeacherResponseDTO {
  @IsNumber()
  teacherId: number;

  @IsString()
  codigoCps: string;

  @IsNumber()
  userId: number;
}
