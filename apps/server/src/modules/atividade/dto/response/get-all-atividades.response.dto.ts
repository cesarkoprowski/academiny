import { IsNumber, IsString } from 'class-validator';

export default class GetAllAtividadesResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  titulo: string;

  @IsString()
  descricao: string;

  @IsNumber()
  cargaHoraria: number;
}
