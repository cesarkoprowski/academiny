import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export default class GetAllNotificationResponseDTO {
  @ApiProperty({
    description: 'Título da notificação',
    example: 'Nova atividade disponível',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Mensagem da notificação',
    example: 'Uma nova atividade foi criada para você',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Status de leitura da notificação',
    example: false,
  })
  @IsBoolean()
  read: boolean;

  @ApiProperty({
    description: 'ID da notificação',
    example: 1,
  })
  @IsNumber()
  id: number;
}
