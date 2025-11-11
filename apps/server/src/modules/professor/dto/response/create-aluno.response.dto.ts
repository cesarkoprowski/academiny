import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class AlunoCreateResponseDTO {
  @IsNumber()
  id: number;
  @IsNumber()
  cursoId: number;
  @IsNotEmpty()
  @IsString()
  matricula: string;
}
