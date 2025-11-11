import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Aluno from 'common/entities/aluno/aluno.entity';
import CreateAlunoRequestDTO from 'modules/professor/dto/request/create-aluno.request.dto';
import IAlunoRepository from 'modules/repository/aluno.repository';
import { Repository } from 'typeorm';

@Injectable()
export default class AlunoRepository implements IAlunoRepository {
  constructor(
    @InjectRepository(Aluno)
    private readonly repository: Repository<Aluno>,
  ) {}

  async create(input: CreateAlunoRequestDTO): Promise<Aluno> {
    const newAluno: Partial<Aluno> = {
      cursoId: input.cursoId,
      matricula: input.matricula,
    };
    return await this.repository.save(newAluno);
  }

  async getById(input: number): Promise<Aluno | null> {
    return await this.repository.findOneBy({ id: input });
  }

  async getAll(): Promise<Aluno[]> {
    return await this.repository.find({
      order: { id: 'DESC' },
    });
  }

  async update(
    id: number,
    input: Partial<CreateAlunoRequestDTO>,
  ): Promise<Aluno | null> {
    const aluno = await this.repository.findOneBy({ id });

    if (!aluno) {
      return null;
    }

    const updatedAluno = this.repository.merge(aluno, {
      ...(input.cursoId && { cursoId: input.cursoId }),
      ...(input.matricula && { matricula: input.matricula }),
    });

    return await this.repository.save(updatedAluno);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByMatricula(matricula: string): Promise<Aluno | null> {
    return await this.repository.findOneBy({ matricula });
  }

  async findByCurso(cursoId: number): Promise<Aluno[]> {
    return await this.repository.find({
      where: { cursoId },
      order: { matricula: 'ASC' },
    });
  }
}
