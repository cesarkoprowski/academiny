import { ApiProperty } from '@nestjs/swagger';

export default class GetProfessorByIdResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'CPS123456' })
  codigoCps: string;

  @ApiProperty({ example: 'João da Silva' })
  nome: string;

  @ApiProperty({ example: '123.456.789-00' })
  cpf: string;

  @ApiProperty({ example: 'joao.silva@email.com' })
  email: string;
}
