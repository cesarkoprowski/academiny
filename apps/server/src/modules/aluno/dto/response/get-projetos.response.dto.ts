import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class GetProjetosResponseDto {
  @IsNumber()
  id: number;

  @IsNumber()
  atividadeExtensaoId: number;

  @IsString()
  atividadeTitulo: string;

  @IsString()
  resumo: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  urlAnexo?: string;

  @IsOptional()
  @IsString()
  feedbackProfessor?: string;

  @IsString()
  nome: string;
}
