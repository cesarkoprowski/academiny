import { Inject, Injectable } from '@nestjs/common';
import Curso from 'common/entities/curso/curso.entity';
import Disciplina from 'common/entities/disciplina/disciplina.entity';
import { IUseCase } from 'common/interface/use-case.interface';
import CreateLinkDisciplineRequestDTO from '../dto/request/create-link-discipline.request.dto';
import CreateLinkDisciplineResponseDTO from '../dto/response/create-link-discipline.response.dto';
import CursoDisciplinaRepository from 'infra/repository/curso-disciplina.repository.imp';

@Injectable()
export default class CreateLinkDisciplineUC
  implements IUseCase<CreateLinkDisciplineRequestDTO, CreateLinkDisciplineResponseDTO> {
  constructor(
    @Inject(CursoDisciplinaRepository)
    private readonly repository: CursoDisciplinaRepository,
  ) { }

  async execute(input: CreateLinkDisciplineRequestDTO): Promise<CreateLinkDisciplineResponseDTO> {
    const newLinkDiscipline = await this.repository.linkDisciplineToCourse(input);

    const linkDisciplineResponseDTO: CreateLinkDisciplineResponseDTO = {
      courseId: newLinkDiscipline.curso.id,
      disciplineId: newLinkDiscipline.disciplina.id,
    }
    return linkDisciplineResponseDTO;
  }
}
