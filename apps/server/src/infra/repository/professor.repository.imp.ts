import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Pessoa from 'common/entities/pessoa/pessoa.entity';
import Professor from 'common/entities/professor/professor.entity';
import IProfessorRepository from 'modules/professor/repository/professor.repository';
import CreateTeacherRequestDTO from 'modules/coordenador/dto/request/create-teacher.request.dto';
import { Repository } from 'typeorm';

@Injectable()
export default class ProfessorRepository implements IProfessorRepository {
  constructor(
    @InjectRepository(Professor)
    private readonly repository: Repository<Professor>,
  ) {}

  async create(input: CreateTeacherRequestDTO): Promise<Professor> {
    const newProfessor: Partial<Professor> = {
      codigoCps: input.codigoCps,
      pessoa: {
        id: input.id,
      } as Pessoa,
    };
    return await this.repository.save(newProfessor);
  }

  async getById(id: number): Promise<Professor | null> {
    return await this.repository.findOne({
      where: { pessoa: { id } },
      relations: ['pessoa'],
    });
  }

  async getByProfessorId(id: number): Promise<Professor | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['pessoa'],
    });
  }

  async getAll(): Promise<Professor[]> {
    return await this.repository.find({
      order: { id: 'DESC' },
    });
  }

  async update(
    id: number,
    input: Partial<CreateTeacherRequestDTO>,
  ): Promise<Professor | null> {
    const professor = await this.repository.findOneBy({ id });

    if (!professor) {
      return null;
    }

    const updatedProfessor = this.repository.merge(professor, {
      ...(input.codigoCps && { codigoCps: input.codigoCps }),
    });

    return await this.repository.save(updatedProfessor);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByCodigoCps(codigoCps: string): Promise<Professor | null> {
    return await this.repository.findOneBy({ codigoCps });
  }

  async findAllWithDetails(): Promise<Professor[]> {
    return await this.repository.find({
      relations: ['pessoa'],
      order: { id: 'DESC' },
    });
  }
}
