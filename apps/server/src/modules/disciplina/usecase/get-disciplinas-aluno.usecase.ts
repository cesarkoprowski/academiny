import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import AlunoDisciplinaRepository from 'infra/repository/aluno-disciplina.repository.imp';

interface GetDisciplinasAlunoResponse {
  id: number;
  disciplinaId: number;
  anoCursado: number;
  anoSemestre: 1 | 2;
  horasExtensaoConcluida: number;
  status: 'Aprovado' | 'Reprovado' | 'Cursando';
}

@Injectable()
export default class GetDisciplinasAlunoUC
  implements IUseCase<number, GetDisciplinasAlunoResponse[]>
{
  constructor(
    @Inject(AlunoDisciplinaRepository)
    private readonly alunoDisciplinaRepository: AlunoDisciplinaRepository,
  ) {}

  async execute(alunoId: number): Promise<GetDisciplinasAlunoResponse[]> {
    const disciplinas =
      await this.alunoDisciplinaRepository.findByAluno(alunoId);

    return disciplinas.map((d) => ({
      id: d.id,
      disciplinaId: d.disciplinaId,
      anoCursado: d.anoCursado,
      anoSemestre: d.anoSemestre,
      horasExtensaoConcluida: d.horasExtensaoConcluida,
      status: d.status,
    }));
  }
}
