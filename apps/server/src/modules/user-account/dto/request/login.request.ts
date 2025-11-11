import { IsEmail, IsStrongPassword } from 'class-validator';

export default class LoginRequestDTO {
  @IsEmail()
  email: string;
  @IsStrongPassword()
  senha: string;
}
