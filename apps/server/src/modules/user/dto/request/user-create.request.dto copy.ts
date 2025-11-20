import { IsEmail, IsString, IsOptional } from 'class-validator';
import { IsCPF } from 'common/decorators/is-cpf.decorator';
import { NormalizeCPF } from 'common/decorators/cpf-transform.decorator';

export default class UpdateUserRequestDTO {
  @IsString()
  @IsOptional()
  nome: string;

  @IsCPF()
  @NormalizeCPF()
  @IsOptional()
  cpf: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
