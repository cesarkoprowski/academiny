import { IsNumber, IsOptional } from 'class-validator';

export default class SubscribeAtividadeRequestDto {
  @IsNumber()
  @IsOptional()
  alunoId: number;

  @IsNumber()
  atividadeExtensaoId: number;
}
