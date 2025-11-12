import { IsNumber, IsOptional } from 'class-validator';

export default class UnsubscribeAtividadeRequestDto {
  @IsNumber()
  @IsOptional()
  alunoId: number;

  @IsNumber()
  atividadeExtensaoId: number;
}
