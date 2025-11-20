import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { IsCPF } from 'common/decorators/is-cpf.decorator';
import { NormalizeCPF } from 'common/decorators/cpf-transform.decorator';

export default class UserCreateRequestDTO {
  @IsString()
  nome: string;

  @IsCPF()
  @NormalizeCPF()
  cpf: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  senha: string;
}
