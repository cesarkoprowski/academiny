import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Coordenador from 'common/entities/coordenador/coordenador.entity';
import Professor from 'common/entities/professor/professor.entity';
import ICoordinatorRepository from 'modules/coordenador/repository/coordinator.repository';
import CreateCoordinatorRequestDTO from 'modules/admin/dto/request/create-coordinator.request.dto';
import { Repository } from 'typeorm';

@Injectable()
export default class CoordinatorRepository implements ICoordinatorRepository {
  constructor(
    @InjectRepository(Coordenador)
    private readonly repository: Repository<Coordenador>,
  ) {}

  async create(input: CreateCoordinatorRequestDTO): Promise<Coordenador> {
    const newCoordenador: Partial<Coordenador> = {
      cursoId: input.cursoId,
      professor: { id: input.professorId } as Professor,
    };
    return await this.repository.save(newCoordenador);
  }

  async getById(id: number): Promise<Coordenador | null> {
    return await this.repository.findOneBy({
      professor: {
        pessoa: {
          id,
        },
      },
    });
  }

  async getAll(): Promise<Coordenador[]> {
    return await this.repository.find({
      relations: ['professor', 'professor.pessoa'],
      order: { id: 'DESC' },
    });
  }

  async update(
    id: number,
    input: Partial<CreateCoordinatorRequestDTO>,
  ): Promise<Coordenador | null> {
    const coordenador = await this.repository.findOneBy({ id });

    if (!coordenador) {
      return null;
    }

    const updatedCoordenador = this.repository.merge(coordenador, {
      ...(input.cursoId && { cursoId: input.cursoId }),
    });

    return await this.repository.save(updatedCoordenador);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByCurso(cursoId: number): Promise<Coordenador | null> {
    return await this.repository.findOne({
      where: { cursoId },
      relations: ['professor', 'professor.pessoa'],
    });
  }

  async findByProfessor(professorId: number): Promise<Coordenador | null> {
    return await this.repository.findOne({
      where: { professor: { id: professorId } },
      relations: ['professor', 'professor.pessoa'],
    });
  }
}
