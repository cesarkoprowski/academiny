import Coordenador from 'common/entities/coordenador/coordenador.entity';
import CreateCoordinatorRequestDTO from 'modules/admin/dto/request/create-coordinator.request.dto';

export default interface ICoordinatorRepository {
  create(input: CreateCoordinatorRequestDTO): Promise<Coordenador>;
}
