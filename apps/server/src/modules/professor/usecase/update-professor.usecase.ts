import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import ProfessorRepository from 'infra/repository/professor.repository.imp';
import type IProfessorRepository from '../repository/professor.repository';
import UpdateProfessorRequestDto from '../dto/request/update-professor.request.dto';

interface UpdateProfessorInput {
  id: number;
  data: UpdateProfessorRequestDto;
}

@Injectable()
export default class UpdateProfessorUC
  implements IUseCase<UpdateProfessorInput, void>
{
  constructor(
    @Inject(ProfessorRepository)
    private readonly professorRepository: IProfessorRepository,
  ) {}

  async execute(input: UpdateProfessorInput): Promise<void> {
    const professor = await this.professorRepository.getByProfessorId(input.id);

    if (!professor) {
      throw new NotFoundException('Professor não encontrado');
    }

    await this.professorRepository.update(input.id, {
      codigoCps: input.data.codigoCps,
    });
  }
}
