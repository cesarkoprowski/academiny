import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export default class UpdateCoordenadorRequestDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  cursoId?: number;
}
