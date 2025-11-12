import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class UpdateProjetoRequestDto {
  @IsNumber()
  projetoId: number;

  @IsString()
  @IsOptional()
  resumo?: string;

  @IsString()
  @IsOptional()
  urlAnexo?: string;
}
