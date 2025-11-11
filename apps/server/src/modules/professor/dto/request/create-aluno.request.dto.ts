import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class AlunoCreateRequestDTO {
  @IsNumber()
  cursoId: number;
  @IsNotEmpty()
  @IsString()
  matricula: string;
  @IsEmail()
  email: string;

  @IsNumber()
  @IsOptional()
  id?: number;
}
