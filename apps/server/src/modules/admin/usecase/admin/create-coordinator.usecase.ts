import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';
import ProfessorRepository from 'infra/repository/professor.repository.imp';
import type IProfessorRepository from 'modules/professor/repository/professor.repository';
import CreateCoordinatorRequestDTO from 'modules/admin/dto/request/create-coordinator.request.dto';
import CreateCoordinatorResponseDTO from 'modules/admin/dto/response/create-coordinator.response.dto';

@Injectable()
export default class CreateCoordinatorUC
  implements IUseCase<CreateCoordinatorRequestDTO, CreateCoordinatorResponseDTO>
{
  constructor(
    @Inject(CoordinatorRepository)
    private readonly repository: CoordinatorRepository,
    @Inject(ProfessorRepository)
    private readonly professorRepository: IProfessorRepository,
  ) {}
  async execute(
    input: CreateCoordinatorRequestDTO,
  ): Promise<CreateCoordinatorResponseDTO> {
    const professor = await this.professorRepository.getById(input.professorId);

    if (!professor)
      throw new NotFoundException(
        'Não foi encontrado nenhum professor com esse id',
      );

    const coordenador = await this.repository.create(input);

    const createCoordinatorResponse = {
      coordenadorId: coordenador.id,
      cursoId: input.cursoId,
      professorId: input.professorId,
    };

    return createCoordinatorResponse;
  }
}
