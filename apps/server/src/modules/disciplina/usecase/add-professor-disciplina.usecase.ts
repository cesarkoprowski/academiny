import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import ProfessorDisciplinaRepository from 'infra/repository/professor-disciplina.repository.imp';
import ProfessorRepository from 'infra/repository/professor.repository.imp';
import type IProfessorRepository from 'modules/professor/repository/professor.repository';
import DisciplinaRepository from 'infra/repository/disciplina.repository.imp';
import type IDisciplinaRepository from 'modules/disciplina/repository/disciplina.repository';
import AddProfessorToDisciplinaRequestDto from '../dto/request/add-professor-disciplina.request.dto';

@Injectable()
export default class AddProfessorToDisciplinaUC
  implements IUseCase<AddProfessorToDisciplinaRequestDto, { message: string }>
{
  constructor(
    @Inject(ProfessorDisciplinaRepository)
    private readonly professorDisciplinaRepository: ProfessorDisciplinaRepository,
    @Inject(ProfessorRepository)
    private readonly professorRepository: IProfessorRepository,
    @Inject(DisciplinaRepository)
    private readonly disciplinaRepository: IDisciplinaRepository,
  ) {}

  async execute(
    input: AddProfessorToDisciplinaRequestDto,
  ): Promise<{ message: string }> {
    const professor = await this.professorRepository.getById(input.professorId);

    if (!professor) {
      throw new NotFoundException('Professor não encontrado.');
    }

    const disciplina = await this.disciplinaRepository.getById(
      input.disciplinaId,
    );

    if (!disciplina) {
      throw new NotFoundException('Disciplina não encontrada.');
    }

    const existingAssociation =
      await this.professorDisciplinaRepository.findByProfessorAndDisciplina(
        input.professorId,
        input.disciplinaId,
      );

    if (existingAssociation) {
      throw new BadRequestException(
        'Professor já está associado a esta disciplina.',
      );
    }

    await this.professorDisciplinaRepository.create({
      professorId: input.professorId,
      disciplinaId: input.disciplinaId,
    });

    return {
      message: 'Professor adicionado à disciplina com sucesso!',
    };
  }
}
