import { IsEnum, IsNumber, IsString } from 'class-validator';
import { EProjetoStatus } from 'modules/projeto/enum/projeto-status.enum';

export default class ProjetoExtensaoCreateResponseDto {
  @IsString()
  nome: string;

  @IsNumber()
  id: number;

  @IsNumber()
  atividadeExtensaoId: number;

  @IsNumber()
  professorAvaliadorId: number;

  @IsString()
  resumo: string;

  @IsEnum(EProjetoStatus)
  status: EProjetoStatus;

  @IsString()
  urlAnexo: string;

  @IsString()
  feedbackProfessor: string;
}
