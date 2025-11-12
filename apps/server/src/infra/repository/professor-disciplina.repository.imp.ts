import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProfessorDisciplina from 'common/aggregate/professor-disciplina/professor.disciplina.aggregate';
import { Repository } from 'typeorm';

@Injectable()
export default class ProfessorDisciplinaRepository {
  constructor(
    @InjectRepository(ProfessorDisciplina)
    private readonly repository: Repository<ProfessorDisciplina>,
  ) {}

  async create(
    input: Partial<ProfessorDisciplina>,
  ): Promise<ProfessorDisciplina> {
    const newProfessorDisciplina: Partial<ProfessorDisciplina> = {
      professorId: input.professorId,
      disciplinaId: input.disciplinaId,
    };
    return await this.repository.save(newProfessorDisciplina);
  }

  async getById(id: number): Promise<ProfessorDisciplina | null> {
    return await this.repository.findOneBy({ id });
  }

  async getAll(): Promise<ProfessorDisciplina[]> {
    return await this.repository.find({
      order: { id: 'DESC' },
    });
  }

  async update(
    id: number,
    input: Partial<ProfessorDisciplina>,
  ): Promise<ProfessorDisciplina | null> {
    const professorDisciplina = await this.repository.findOneBy({ id });

    if (!professorDisciplina) {
      return null;
    }

    const updated = this.repository.merge(professorDisciplina, {
      ...(input.professorId && { professorId: input.professorId }),
      ...(input.disciplinaId && { disciplinaId: input.disciplinaId }),
    });

    return await this.repository.save(updated);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByProfessor(professorId: number): Promise<ProfessorDisciplina[]> {
    return await this.repository.find({
      where: { professorId },
    });
  }

  async findByDisciplina(disciplinaId: number): Promise<ProfessorDisciplina[]> {
    return await this.repository.find({
      where: { disciplinaId },
    });
  }

  async findByProfessorAndDisciplina(
    professorId: number,
    disciplinaId: number,
  ): Promise<ProfessorDisciplina | null> {
    return await this.repository.findOne({
      where: { professorId, disciplinaId },
    });
  }
}
