import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';
import type ICoordinatorRepository from '../repository/coordinator.repository';
import GetCoordenadorByIdResponseDto from '../dto/response/get-coordenador-by-id.response.dto';

@Injectable()
export default class GetCoordenadorByIdUC
  implements IUseCase<number, GetCoordenadorByIdResponseDto>
{
  constructor(
    @Inject(CoordinatorRepository)
    private readonly coordinatorRepository: ICoordinatorRepository,
  ) {}

  async execute(id: number): Promise<GetCoordenadorByIdResponseDto> {
    const coordenador =
      await this.coordinatorRepository.getByIdWithRelations(id);

    if (!coordenador) {
      throw new NotFoundException('Coordenador não encontrado');
    }

    return {
      id: coordenador.id,
      cursoId: coordenador.cursoId,
      professorId: coordenador.professor.id,
      codigoCps: coordenador.professor.codigoCps,
      nome: coordenador.professor.pessoa.nome,
      cpf: coordenador.professor.pessoa.cpf,
      email: coordenador.professor.pessoa.email,
    };
  }
}
