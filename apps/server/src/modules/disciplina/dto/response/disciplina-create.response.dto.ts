import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Modalidade } from 'modules/curso/enum/modalidade.enum';
import { Turno } from 'modules/curso/enum/turno.enum';

export default class DisciplinaCreateResponseDto {
  @IsNumber()
  id: number

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsNumber()
  cargaHorariaExtensao: number;
}
