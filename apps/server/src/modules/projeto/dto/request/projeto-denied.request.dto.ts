import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class DeniedProjectRequestDTO {
  @ApiProperty({
    description: 'Motivo da reprovação do projeto',
    example: 'O projeto não atende aos requisitos mínimos de extensão',
  })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({
    description: 'ID do projeto a ser reprovado',
    example: 1,
  })
  @IsNumber()
  projectId: number;
}
