import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Modalidade } from 'modules/curso/enum/modalidade.enum';
import { Turno } from 'modules/curso/enum/turno.enum';
export default class CursoResponseCreateDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsEnum(Modalidade)
  @IsNotEmpty()
  modalidade: Modalidade;

  @IsString()
  @IsEnum(Turno)
  @IsNotEmpty()
  turno: Turno;

  @IsNumber()
  vagas: number;

  @IsNumber()
  cargaHorariaExtensao: number;
}
