import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class ProjetoExtensaoCreateRequestDto {
  @IsString()
  nome: string;

  @IsNumber()
  atividadeExtensaoId: number;

  @IsNumber()
  professorAvaliadorId: number;

  @IsString()
  resumo: string;

  @IsOptional()
  @IsString()
  urlAnexo: string;

  @IsString()
  @IsOptional()
  feedbackProfessor: string;
}
