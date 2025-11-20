import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import ProfessorDisciplinaRepository from 'infra/repository/professor-disciplina.repository.imp';
import RemoveProfessorFromDisciplinaRequestDto from '../dto/request/remove-professor-disciplina.request.dto';

@Injectable()
export default class RemoveProfessorFromDisciplinaUC
  implements
    IUseCase<RemoveProfessorFromDisciplinaRequestDto, { message: string }>
{
  constructor(
    @Inject(ProfessorDisciplinaRepository)
    private readonly professorDisciplinaRepository: ProfessorDisciplinaRepository,
  ) {}

  async execute(
    input: RemoveProfessorFromDisciplinaRequestDto,
  ): Promise<{ message: string }> {
    const association =
      await this.professorDisciplinaRepository.findByProfessorAndDisciplina(
        input.professorId,
        input.disciplinaId,
      );

    if (!association) {
      throw new NotFoundException(
        'Professor não está associado a esta disciplina.',
      );
    }

    const deleted = await this.professorDisciplinaRepository.delete(
      association.id,
    );

    if (!deleted) {
      throw new NotFoundException('Erro ao remover professor da disciplina.');
    }

    return {
      message: 'Professor removido da disciplina com sucesso!',
    };
  }
}
