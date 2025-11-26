import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AlunoProjetoExtensao from 'common/aggregate/aluno-projeto/aluno-projeto.aggregate';
import { Repository } from 'typeorm';

@Injectable()
export default class AlunoProjetoRepository {
  constructor(
    @InjectRepository(AlunoProjetoExtensao)
    private readonly repository: Repository<AlunoProjetoExtensao>,
  ) {}

  async create(
    input: Partial<AlunoProjetoExtensao>,
  ): Promise<AlunoProjetoExtensao> {
    const newAlunoProjeto: Partial<AlunoProjetoExtensao> = {
      alunoId: input.alunoId,
      projetoExtensaoId: input.projetoExtensaoId,
    };
    return await this.repository.save(newAlunoProjeto);
  }

  async getById(id: number): Promise<AlunoProjetoExtensao | null> {
    return await this.repository.findOneBy({ id });
  }

  async getAll(): Promise<AlunoProjetoExtensao[]> {
    return await this.repository.find({
      order: { id: 'DESC' },
    });
  }

  async update(
    id: number,
    input: Partial<AlunoProjetoExtensao>,
  ): Promise<AlunoProjetoExtensao | null> {
    const alunoProjeto = await this.repository.findOneBy({ id });

    if (!alunoProjeto) {
      return null;
    }

    const updated = this.repository.merge(alunoProjeto, {
      ...(input.alunoId && { alunoId: input.alunoId }),
      ...(input.projetoExtensaoId && {
        projetoExtensaoId: input.projetoExtensaoId,
      }),
    });

    return await this.repository.save(updated);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByAluno(alunoId: number): Promise<AlunoProjetoExtensao[]> {
    return await this.repository.find({
      where: { alunoId },
    });
  }

  async findByProjeto(
    projetoExtensaoId: number,
  ): Promise<AlunoProjetoExtensao | null> {
    return await this.repository.findOneBy({ projetoExtensaoId });
  }

  async findByAlunoAndProjeto(
    alunoId: number,
    projetoExtensaoId: number,
  ): Promise<AlunoProjetoExtensao | null> {
    return await this.repository.findOne({
      where: { alunoId, projetoExtensaoId },
    });
  }
}
