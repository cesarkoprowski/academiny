import CursoDisciplina from "common/aggregate/curso-disciplina/curso-disciplina.aggregate";
import CreateLinkDisciplineRequestDTO from "../dto/request/create-link-discipline.request.dto";

export default interface ICourseDisciplineRepository {
  linkDisciplineToCourse(input: CreateLinkDisciplineRequestDTO): Promise<CursoDisciplina>;
}