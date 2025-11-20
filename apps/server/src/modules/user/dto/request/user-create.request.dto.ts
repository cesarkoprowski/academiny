import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsCPF } from 'common/decorators/is-cpf.decorator';
import { NormalizeCPF } from 'common/decorators/cpf-transform.decorator';

export default class UserCreateRequestDTO {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'CPF do usuário (com ou sem máscara)',
    example: '123.456.789-00',
  })
  @IsCPF()
  @NormalizeCPF()
  cpf: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joao.silva@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha forte do usuário',
    example: 'SenhaForte@123',
  })
  @IsStrongPassword()
  senha: string;
}
