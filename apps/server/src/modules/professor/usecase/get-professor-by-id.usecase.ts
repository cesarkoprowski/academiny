import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import ProfessorRepository from 'infra/repository/professor.repository.imp';
import type IProfessorRepository from '../repository/professor.repository';
import GetProfessorByIdResponseDto from '../dto/response/get-professor-by-id.response.dto';

@Injectable()
export default class GetProfessorByIdUC
  implements IUseCase<number, GetProfessorByIdResponseDto>
{
  constructor(
    @Inject(ProfessorRepository)
    private readonly professorRepository: IProfessorRepository,
  ) {}

  async execute(id: number): Promise<GetProfessorByIdResponseDto> {
    const professors = await this.professorRepository.findAllWithDetails();
    const professor = professors.find((p) => p.id === id);

    if (!professor) {
      throw new NotFoundException('Professor não encontrado');
    }

    return {
      id: professor.id,
      codigoCps: professor.codigoCps,
      nome: professor.pessoa.nome,
      cpf: professor.pessoa.cpf,
      email: professor.pessoa.email,
    };
  }
}
