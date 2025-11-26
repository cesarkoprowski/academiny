import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class SendNotificationRequestDTO {
  @ApiProperty({
    description: 'Título da notificação',
    example: 'Projeto Aprovado',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Mensagem da notificação',
    example: 'Seu projeto de extensão foi aprovado pelo professor!',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'ID do usuário destinatário da notificação',
    example: 5,
  })
  @IsNumber()
  destinationUserId: number;
}
