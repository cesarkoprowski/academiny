import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FormatCPF } from 'common/decorators/cpf-transform.decorator';

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

  @FormatCPF()
  @IsString()
  cpf: string;
}
