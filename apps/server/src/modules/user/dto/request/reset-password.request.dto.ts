import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class ResetPasswordRequestDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Código de verificação recebido por email',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Nova senha forte',
    example: 'NovaSenha@123',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  newPassword: string;
}
