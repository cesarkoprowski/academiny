import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import CursoDisciplina from "common/aggregate/curso-disciplina/curso-disciplina.aggregate";
import Curso from "common/entities/curso/curso.entity";
import Disciplina from "common/entities/disciplina/disciplina.entity";
import CreateLinkDisciplineRequestDTO from "modules/curso/dto/request/create-link-discipline.request.dto";
import ICourseDisciplineRepository from "modules/curso/repository/course-discipline.repository";
import { Repository } from "typeorm";

@Injectable()
export default class CursoDisciplinaRepository implements ICourseDisciplineRepository {

  constructor(
    @InjectRepository(CursoDisciplina)
    private readonly repository: Repository<CursoDisciplina>
  ) {}

  async linkDisciplineToCourse(input: CreateLinkDisciplineRequestDTO): Promise<CursoDisciplina> {
    const newLink: Partial<CursoDisciplina> = {
      curso: {id: input.courseId} as Curso,
      disciplina: {id: input.disciplineId} as Disciplina
    };
    return await this.repository.save(newLink);
  }
}