import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class AlunoCreateRequestDTO {
  @IsNumber()
  cursoId: number;
  @IsNotEmpty()
  @IsString()
  matricula: string;
  @IsEmail()
  email: string;
}
