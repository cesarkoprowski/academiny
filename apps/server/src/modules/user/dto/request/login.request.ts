import { IsEmail, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class LoginRequestDTO {
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joao.silva@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'SenhaForte@123',
  })
  @IsStrongPassword()
  senha: string;
}
