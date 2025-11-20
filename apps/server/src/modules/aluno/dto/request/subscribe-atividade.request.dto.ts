import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class SubscribeAtividadeRequestDto {
  @ApiProperty({
    description: 'ID do aluno (opcional, será preenchido automaticamente)',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  alunoId: number;

  @ApiProperty({
    description: 'ID da atividade de extensão',
    example: 1,
  })
  @IsNumber()
  atividadeExtensaoId: number;
}
