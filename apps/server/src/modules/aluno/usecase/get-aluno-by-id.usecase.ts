import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import AlunoRepository from 'infra/repository/aluno.repository.imp';
import type IAlunoRepository from '../repository/aluno.repository';
import GetAlunoByIdResponseDto from '../dto/response/get-aluno-by-id.response.dto';

@Injectable()
export default class GetAlunoByIdUC
  implements IUseCase<number, GetAlunoByIdResponseDto>
{
  constructor(
    @Inject(AlunoRepository)
    private readonly alunoRepository: IAlunoRepository,
  ) {}

  async execute(id: number): Promise<GetAlunoByIdResponseDto> {
    const alunos = await this.alunoRepository.findAllWithDetails();
    const aluno = alunos.find((a) => a.id === id);

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    return {
      id: aluno.id,
      matricula: aluno.matricula,
      cursoId: aluno.cursoId,
      nome: aluno.pessoa.nome,
      cpf: aluno.pessoa.cpf,
      email: aluno.pessoa.email,
    };
  }
}
