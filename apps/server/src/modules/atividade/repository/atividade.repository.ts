import AtividadeExtensao from 'common/entities/atividade/atividade.entity';
import { IRepository } from 'common/interface/repository.interface';

export default interface IAtividadeExtensaoRepository extends IRepository {
  findByTitulo(titulo: string): Promise<AtividadeExtensao[]>;
  findByCargaHoraria(
    minHoras: number,
    maxHoras?: number,
  ): Promise<AtividadeExtensao[]>;
}
