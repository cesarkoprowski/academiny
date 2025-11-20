import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export default class UpdateAlunoRequestDto {
  @ApiProperty({ example: '2024001', required: false })
  @IsOptional()
  @IsString()
  matricula?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  cursoId?: number;
}
