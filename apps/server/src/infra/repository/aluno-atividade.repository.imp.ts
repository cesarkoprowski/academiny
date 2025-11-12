import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AlunoAtividadeExtensao from 'common/aggregate/aluno-atividade/aluno-atividade.aggregate';
import { Repository } from 'typeorm';

@Injectable()
export default class AlunoAtividadeRepository {
  constructor(
    @InjectRepository(AlunoAtividadeExtensao)
    private readonly repository: Repository<AlunoAtividadeExtensao>,
  ) {}

  async create(
    input: Partial<AlunoAtividadeExtensao>,
  ): Promise<AlunoAtividadeExtensao> {
    const newAlunoAtividade: Partial<AlunoAtividadeExtensao> = {
      alunoId: input.alunoId,
      atividadeExtensaoId: input.atividadeExtensaoId,
    };
    return await this.repository.save(newAlunoAtividade);
  }

  async getById(id: number): Promise<AlunoAtividadeExtensao | null> {
    return await this.repository.findOneBy({ id });
  }

  async getAll(): Promise<AlunoAtividadeExtensao[]> {
    return await this.repository.find({
      order: { id: 'DESC' },
    });
  }

  async update(
    id: number,
    input: Partial<AlunoAtividadeExtensao>,
  ): Promise<AlunoAtividadeExtensao | null> {
    const alunoAtividade = await this.repository.findOneBy({ id });

    if (!alunoAtividade) {
      return null;
    }

    const updated = this.repository.merge(alunoAtividade, {
      ...(input.alunoId && { alunoId: input.alunoId }),
      ...(input.atividadeExtensaoId && {
        atividadeExtensaoId: input.atividadeExtensaoId,
      }),
    });

    return await this.repository.save(updated);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByAluno(alunoId: number): Promise<AlunoAtividadeExtensao[]> {
    return await this.repository.find({
      where: { alunoId },
    });
  }

  async findByAtividade(
    atividadeExtensaoId: number,
  ): Promise<AlunoAtividadeExtensao[]> {
    return await this.repository.find({
      where: { atividadeExtensaoId },
    });
  }

  async findByAlunoAndAtividade(
    alunoId: number,
    atividadeExtensaoId: number,
  ): Promise<AlunoAtividadeExtensao | null> {
    return await this.repository.findOne({
      where: { alunoId, atividadeExtensaoId },
    });
  }
}
