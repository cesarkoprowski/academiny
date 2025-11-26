import ProjetoExtensao from 'common/entities/projeto/projeto.entity';
import { IRepository } from 'common/interface/repository.interface';

export default interface IProjetoExtensaoRepository
  extends IRepository<ProjetoExtensao> {
  findByTitulo(titulo: string): Promise<ProjetoExtensao[]>;
  findByCargaHoraria(
    minHoras: number,
    maxHoras?: number,
  ): Promise<ProjetoExtensao[]>;
  acceptProjeto(id: number): Promise<void>;
  deniedProjeto(id: number): Promise<void>;
}
