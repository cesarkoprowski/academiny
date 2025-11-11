import { IsEmail, IsNumber, IsString } from 'class-validator';

export default class UserCreateResponseDTO {
  @IsNumber()
  id: number;
  @IsString()
  nome: string;
  @IsString()
  cpf: string;
  @IsEmail()
  email: string;
}
