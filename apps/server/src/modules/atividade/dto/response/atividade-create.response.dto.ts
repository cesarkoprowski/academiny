import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class AtividadeExtensaoCreateResponseDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  @IsNotEmpty()
  cargaHoraria: number;
}