import { IsEmail, IsNumber, IsString } from 'class-validator';
import { FormatCPF } from 'common/decorators/cpf-transform.decorator';

export default class UserCreateResponseDTO {
  @IsNumber()
  id: number;

  @IsString()
  nome: string;

  @FormatCPF()
  @IsString()
  cpf: string;

  @IsEmail()
  email: string;
}
