import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateTeacherRequestDTO {
  @ApiProperty({
    description: 'Código CPS do professor',
    example: 'PROF001',
  })
  @IsString()
  codigoCps: string;

  @ApiProperty({
    description: 'E-mail do professor',
    example: 'professor@universidade.edu.br',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'ID da pessoa (opcional)',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id?: number;
}
