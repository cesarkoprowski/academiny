import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import CoordinatorRepository from 'infra/repository/coordinator.repository.imp';
import type ICoordinatorRepository from 'modules/coordenador/repository/coordinator.repository';

@Injectable()
export default class DeleteCoordinatorUC implements IUseCase<number, void> {
  constructor(
    @Inject(CoordinatorRepository)
    private readonly coordinatorRepository: ICoordinatorRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const coordinator =
      await this.coordinatorRepository.getByIdWithRelations(id);

    if (!coordinator) {
      throw new NotFoundException('Coordenador não encontrado.');
    }

    const deleted = await this.coordinatorRepository.delete(coordinator.id);

    if (!deleted) {
      throw new NotFoundException('Erro ao deletar coordenador.');
    }
  }
}
