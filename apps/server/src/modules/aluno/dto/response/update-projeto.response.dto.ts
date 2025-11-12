import { IsEnum, IsNumber, IsString } from 'class-validator';
import { EProjetoStatus } from 'modules/projeto/enum/projeto-status.enum';

export default class UpdateProjetoResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  resumo: string;

  @IsEnum(EProjetoStatus)
  status: EProjetoStatus;

  @IsString()
  urlAnexo: string;
}
