import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import ProfessorRepository from 'infra/repository/professor.repository.imp';
import type IProfessorRepository from '../repository/professor.repository';
import GetAllProfessorsResponseDto from '../dto/response/get-all-professors.response.dto';

@Injectable()
export default class GetAllProfessorsUC
  implements IUseCase<void, GetAllProfessorsResponseDto[]>
{
  constructor(
    @Inject(ProfessorRepository)
    private readonly professorRepository: IProfessorRepository,
  ) {}

  async execute(): Promise<GetAllProfessorsResponseDto[]> {
    const professors = await this.professorRepository.findAllWithDetails();

    return professors.map((professor) => ({
      id: professor.id,
      codigoCps: professor.codigoCps,
      nome: professor.pessoa.nome,
      cpf: professor.pessoa.cpf,
      email: professor.pessoa.email,
    }));
  }
}
