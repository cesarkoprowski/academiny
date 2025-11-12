import { IsNumber } from 'class-validator';

export default class SubscribeAtividadeResponseDto {
  @IsNumber()
  id: number;

  @IsNumber()
  alunoId: number;

  @IsNumber()
  atividadeExtensaoId: number;
}
