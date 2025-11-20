import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateProjetoRequestDto {
  @ApiProperty({
    description: 'Nome do projeto',
    example: 'Sistema de Gestão Acadêmica',
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    description: 'ID da atividade de extensão vinculada',
    example: 1,
  })
  @IsNumber()
  atividadeExtensaoId: number;

  @ApiProperty({
    description: 'Resumo descritivo do projeto',
    example: 'Projeto de desenvolvimento de sistema web para gestão acadêmica',
  })
  @IsString()
  resumo: string;

  @ApiProperty({
    description: 'URL do anexo do projeto',
    example: 'https://exemplo.com/anexo.pdf',
  })
  @IsString()
  urlAnexo: string;
}
