import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class GetMeRequestDto {
  @IsNumber()
  id: number;

  @IsString()
  matricula: string;

  @IsNumber()
  cursoId: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  cpf: string;
}
