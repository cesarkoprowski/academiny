import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Coordenador from 'common/entities/coordenador/coordenador.entity';
import Professor from 'common/entities/professor/professor.entity';
import ICoordinatorRepository from 'modules/repository/coordinator.repository';
import CreateCoordinatorRequestDTO from 'modules/admin/dto/request/create-coordinator.request.dto';
import { Repository } from 'typeorm';

@Injectable()
export default class CoordinatorRepository implements ICoordinatorRepository {
  constructor(
    @InjectRepository(Coordenador)
    private readonly repository: Repository<Coordenador>,
  ) {}

  getAll(): Promise<Coordenador[]> {
    throw new Error('Method not implemented.');
  }
  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(): Promise<Coordenador> {
    throw new Error('Method not implemented.');
  }

  async getById(input: number): Promise<Coordenador | null> {
    return await this.repository.findOneBy({ id: input });
  }

  async create(input: CreateCoordinatorRequestDTO): Promise<Coordenador> {
    const newCoordenador: Partial<Coordenador> = {
      cursoId: input.cursoId,
      professor: { id: input.professorId } as Professor,
    };
    return await this.repository.save(newCoordenador);
  }
}
