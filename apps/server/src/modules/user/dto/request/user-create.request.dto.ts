import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export default class UserCreateRequestDTO {
  @IsString()
  nome: string;
  @IsString()
  cpf: string;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  senha: string;
}
