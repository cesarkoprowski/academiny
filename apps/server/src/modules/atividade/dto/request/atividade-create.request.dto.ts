import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class AtividadeExtensaoCreateRequestDto {
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