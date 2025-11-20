import { ApiProperty } from '@nestjs/swagger';

export default class GetAlunoByIdResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2024001' })
  matricula: string;

  @ApiProperty({ example: 1 })
  cursoId: number;

  @ApiProperty({ example: 'Maria da Silva' })
  nome: string;

  @ApiProperty({ example: '123.456.789-00' })
  cpf: string;

  @ApiProperty({ example: 'maria.silva@email.com' })
  email: string;
}
