import { IsEmail, IsString, IsOptional } from 'class-validator';

export default class UpdateUserRequestDTO {
  @IsString()
  @IsOptional()
  nome: string;
  @IsString()
  @IsOptional()
  cpf: string;
  @IsEmail()
  @IsOptional()
  email: string;
}
