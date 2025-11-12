import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateProjetoRequestDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  atividadeExtensaoId: number;

  @IsString()
  resumo: string;

  @IsString()
  urlAnexo: string;
}
