import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AlunoDisciplinas from 'common/aggregate/aluno-disciplina/aluno-disciplina.aggregate';
import { Repository } from 'typeorm';

@Injectable()
export default class AlunoDisciplinaRepository {
  constructor(
    @InjectRepository(AlunoDisciplinas)
    private readonly repository: Repository<AlunoDisciplinas>,
  ) {}

  async create(input: Partial<AlunoDisciplinas>): Promise<AlunoDisciplinas> {
    const newAlunoDisciplina: Partial<AlunoDisciplinas> = {
      alunoId: input.alunoId,
      disciplinaId: input.disciplinaId,
      anoCursado: input.anoCursado,
      anoSemestre: input.anoSemestre,
      horasExtensaoConcluida: input.horasExtensaoConcluida,
      status: input.status,
    };
    return await this.repository.save(newAlunoDisciplina);
  }

  async getById(id: number): Promise<AlunoDisciplinas | null> {
    return await this.repository.findOneBy({ id });
  }

  async getAll(): Promise<AlunoDisciplinas[]> {
    return await this.repository.find({
      order: { id: 'DESC' },
    });
  }

  async update(
    id: number,
    input: Partial<AlunoDisciplinas>,
  ): Promise<AlunoDisciplinas | null> {
    const alunoDisciplina = await this.repository.findOneBy({ id });

    if (!alunoDisciplina) {
      return null;
    }

    const updated = this.repository.merge(alunoDisciplina, {
      ...(input.anoCursado && { anoCursado: input.anoCursado }),
      ...(input.anoSemestre && { anoSemestre: input.anoSemestre }),
      ...(input.horasExtensaoConcluida && {
        horasExtensaoConcluida: input.horasExtensaoConcluida,
      }),
      ...(input.status && { status: input.status }),
    });

    return await this.repository.save(updated);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByAluno(alunoId: number): Promise<AlunoDisciplinas[]> {
    return await this.repository.find({
      where: { alunoId },
      order: { anoCursado: 'DESC', anoSemestre: 'DESC' },
    });
  }

  async findByDisciplina(disciplinaId: number): Promise<AlunoDisciplinas[]> {
    return await this.repository.find({
      where: { disciplinaId },
    });
  }

  async findByStatus(status: string): Promise<AlunoDisciplinas[]> {
    return await this.repository.find({
      where: { status: status as 'Aprovado' | 'Reprovado' | 'Cursando' },
    });
  }
}
