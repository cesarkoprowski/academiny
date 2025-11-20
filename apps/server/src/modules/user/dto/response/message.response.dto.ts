import { ApiProperty } from '@nestjs/swagger';

export default class MessageResponseDto {
  @ApiProperty({
    description: 'Mensagem de resposta',
    example: 'Operação realizada com sucesso',
  })
  message: string;
}
