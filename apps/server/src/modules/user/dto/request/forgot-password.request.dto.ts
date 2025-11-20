import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class ForgotPasswordRequestDto {
  @ApiProperty({
    description: 'Email do usuário que esqueceu a senha',
    example: 'joao.silva@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
