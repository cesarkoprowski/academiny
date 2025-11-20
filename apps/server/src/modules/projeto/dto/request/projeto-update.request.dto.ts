import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class ProjetoExtensaoUpdateRequestDto {
  @ApiProperty({
    description: 'Nome do projeto de extensão',
    example: 'Sistema para ONGs Locais - Atualizado',
    required: false,
  })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({
    description: 'ID da atividade de extensão vinculada',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  atividadeExtensaoId?: number;

  @ApiProperty({
    description: 'ID do professor avaliador',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  professorAvaliadorId?: number;

  @ApiProperty({
    description: 'Resumo do projeto',
    example:
      'Desenvolvimento de sistema web para gestão de ONGs - versão atualizada',
    required: false,
  })
  @IsOptional()
  @IsString()
  resumo?: string;

  @ApiProperty({
    description: 'URL do anexo do projeto',
    example: 'https://exemplo.com/projeto-atualizado.pdf',
    required: false,
  })
  @IsOptional()
  @IsString()
  urlAnexo?: string;

  @ApiProperty({
    description: 'Feedback do professor avaliador',
    example: 'Projeto bem estruturado com melhorias significativas',
    required: false,
  })
  @IsOptional()
  @IsString()
  feedbackProfessor?: string;
}
