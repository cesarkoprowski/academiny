import Coordenador from 'common/entities/coordenador/coordenador.entity';
import { IRepository } from 'common/interface/repository.interface';
import CreateCoordinatorRequestDTO from 'modules/admin/dto/request/create-coordinator.request.dto';

export default interface ICoordinatorRepository extends IRepository {
  create(input: CreateCoordinatorRequestDTO): Promise<Coordenador>;
  getById(input: number): Promise<Coordenador | null>;
}
