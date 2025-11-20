import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export default class UpdateProfessorRequestDto {
  @ApiProperty({ example: 'CPS123456', required: false })
  @IsOptional()
  @IsString()
  codigoCps?: string;
}
