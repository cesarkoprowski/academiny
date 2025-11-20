import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';
import type ICoordinatorRepository from '../repository/coordinator.repository';
import GetAllCoordenadoresResponseDto from '../dto/response/get-all-coordenadores.response.dto';

@Injectable()
export default class GetAllCoordenadoresUC
  implements IUseCase<void, GetAllCoordenadoresResponseDto[]>
{
  constructor(
    @Inject(CoordinatorRepository)
    private readonly coordinatorRepository: ICoordinatorRepository,
  ) {}

  async execute(): Promise<GetAllCoordenadoresResponseDto[]> {
    const coordenadores = await this.coordinatorRepository.getAll();

    return coordenadores.map((coordenador) => ({
      id: coordenador.id,
      cursoId: coordenador.cursoId,
      professorId: coordenador.professor.id,
      codigoCps: coordenador.professor.codigoCps,
      nome: coordenador.professor.pessoa.nome,
      cpf: coordenador.professor.pessoa.cpf,
      email: coordenador.professor.pessoa.email,
    }));
  }
}
