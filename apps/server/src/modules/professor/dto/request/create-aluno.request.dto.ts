import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class AlunoCreateRequestDTO {
  @ApiProperty({
    description: 'ID do curso em que o aluno será matriculado',
    example: 1,
  })
  @IsNumber()
  cursoId: number;

  @ApiProperty({
    description: 'Número de matrícula do aluno',
    example: '2024001',
  })
  @IsNotEmpty()
  @IsString()
  matricula: string;

  @ApiProperty({
    description: 'E-mail do aluno',
    example: 'aluno@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'ID da pessoa (opcional)',
    example: 10,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id?: number;
}
