import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class DisciplinaCreateResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsNumber()
  cargaHorariaExtensao: number;
}
