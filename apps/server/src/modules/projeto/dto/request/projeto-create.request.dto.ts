import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class ProjetoExtensaoCreateRequestDto {
  @ApiProperty({
    description: 'Nome do projeto de extensão',
    example: 'Sistema para ONGs Locais',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'ID da atividade de extensão vinculada',
    example: 1,
  })
  @IsNumber()
  atividadeExtensaoId: number;

  @ApiProperty({
    description: 'ID do professor avaliador',
    example: 1,
  })
  @IsNumber()
  professorAvaliadorId: number;

  @ApiProperty({
    description: 'Resumo do projeto',
    example: 'Desenvolvimento de sistema web para gestão de ONGs',
  })
  @IsString()
  resumo: string;

  @ApiProperty({
    description: 'URL do anexo do projeto',
    example: 'https://exemplo.com/projeto.pdf',
    required: false,
  })
  @IsOptional()
  @IsString()
  urlAnexo: string;

  @ApiProperty({
    description: 'Feedback do professor avaliador',
    example: 'Projeto bem estruturado',
    required: false,
  })
  @IsString()
  @IsOptional()
  feedbackProfessor: string;
}
