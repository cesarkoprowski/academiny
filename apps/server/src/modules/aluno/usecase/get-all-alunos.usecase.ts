import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import AlunoRepository from 'infra/repository/aluno.repository.imp';
import type IAlunoRepository from '../repository/aluno.repository';
import GetAllAlunosResponseDto from '../dto/response/get-all-alunos.response.dto';

@Injectable()
export default class GetAllAlunosUC
  implements IUseCase<void, GetAllAlunosResponseDto[]>
{
  constructor(
    @Inject(AlunoRepository)
    private readonly alunoRepository: IAlunoRepository,
  ) {}

  async execute(): Promise<GetAllAlunosResponseDto[]> {
    const alunos = await this.alunoRepository.findAllWithDetails();

    return alunos.map((aluno) => ({
      id: aluno.id,
      matricula: aluno.matricula,
      cursoId: aluno.cursoId,
      nome: aluno.pessoa.nome,
      cpf: aluno.pessoa.cpf,
      email: aluno.pessoa.email,
    }));
  }
}
