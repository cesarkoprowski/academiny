import { IsBoolean } from 'class-validator';

export default class UnsubscribeAtividadeResponseDto {
  @IsBoolean()
  success: boolean;
}
