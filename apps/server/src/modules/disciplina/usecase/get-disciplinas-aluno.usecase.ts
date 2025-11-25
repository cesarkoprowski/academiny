import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import AlunoDisciplinaRepository from 'infra/repository/aluno-disciplina.repository.imp';
import GetDisciplinasAlunoResponseDto from '../dto/response/get-disciplinas-aluno.response.dto';

@Injectable()
export default class GetDisciplinasAlunoUC
  implements IUseCase<number, GetDisciplinasAlunoResponseDto[]>
{
  constructor(
    @Inject(AlunoDisciplinaRepository)
    private readonly alunoDisciplinaRepository: AlunoDisciplinaRepository,
  ) {}

  async execute(alunoId: number): Promise<GetDisciplinasAlunoResponseDto[]> {
    const disciplinas =
      await this.alunoDisciplinaRepository.findByAluno(alunoId);

    const DisciplinaResponseDTO = disciplinas.map((disciplina) => {
      return {
        id: disciplina.id,
        alunoId: disciplina.alunoId,
        disciplinaId: disciplina.disciplinaId,
        anoCursado: disciplina.anoCursado,
        anoSemestre: disciplina.anoSemestre,
        horasExtensaoConcluida: disciplina.horasExtensaoConcluida,
        status: disciplina.status,
      };
    });
    return DisciplinaResponseDTO;
  }
}
