import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';
import type ICoordinatorRepository from '../repository/coordinator.repository';
import UpdateCoordenadorRequestDto from '../dto/request/update-coordenador.request.dto';

interface UpdateCoordenadorInput {
  id: number;
  data: UpdateCoordenadorRequestDto;
}

@Injectable()
export default class UpdateCoordenadorUC
  implements IUseCase<UpdateCoordenadorInput, void>
{
  constructor(
    @Inject(CoordinatorRepository)
    private readonly coordinatorRepository: ICoordinatorRepository,
  ) {}

  async execute(input: UpdateCoordenadorInput): Promise<void> {
    const coordenador = await this.coordinatorRepository.getById(input.id);

    if (!coordenador) {
      throw new NotFoundException('Coordenador não encontrado');
    }

    await this.coordinatorRepository.update(input.id, {
      cursoId: input.data.cursoId,
    });
  }
}
