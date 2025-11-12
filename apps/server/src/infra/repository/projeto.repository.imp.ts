import ProjetoExtensao from 'common/entities/projeto/projeto.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import IProjetoExtensaoRepository from 'modules/projeto/repository/projeto.repository';
import { Repository } from 'typeorm';

@Injectable()
export default class ProjetoExtensaoRepository
  implements IProjetoExtensaoRepository
{
  constructor(
    @InjectRepository(ProjetoExtensao)
    private readonly repository: Repository<ProjetoExtensao>,
  ) {}

  async create(input: Partial<ProjetoExtensao>): Promise<ProjetoExtensao> {
    const newProjeto: Partial<ProjetoExtensao> = {
      nome: input.nome,
      resumo: input.resumo,
      status: input.status,
      urlAnexo: input.urlAnexo,
      feedbackProfessor: input.feedbackProfessor,
      atividadeExtensao: input.atividadeExtensao,
      professorAvaliadorId: input.professorAvaliadorId,
    };
    return await this.repository.save(newProjeto);
  }

  async getById(id: number): Promise<ProjetoExtensao | null> {
    return await this.repository.findOne({
      where: {
        id,
      },
      relations: ['atividadeExtensao', 'professorAvaliadorId'],
    });
  }

  async getAll(): Promise<ProjetoExtensao[]> {
    return await this.repository.find({
      relations: ['atividadeExtensao', 'professorAvaliadorId'],
      order: { id: 'DESC' },
    });
  }

  async update(
    id: number,
    input: Partial<ProjetoExtensao>,
  ): Promise<ProjetoExtensao | null> {
    const projeto = await this.repository.findOneBy({ id });

    if (!projeto) {
      return null;
    }

    const updatedProjeto = this.repository.merge(projeto, {
      ...(input.resumo && { resumo: input.resumo }),
      ...(input.status && { status: input.status }),
      ...(input.urlAnexo && { urlAnexo: input.urlAnexo }),
      ...(input.feedbackProfessor && {
        feedbackProfessor: input.feedbackProfessor,
      }),
    });

    return await this.repository.save(updatedProjeto);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByTitulo(titulo: string): Promise<ProjetoExtensao[]> {
    return await this.repository
      .createQueryBuilder('projeto')
      .leftJoinAndSelect('projeto.atividadeExtensao', 'atividade')
      .where('atividade.titulo ILIKE :titulo', { titulo: `%${titulo}%` })
      .getMany();
  }

  async findByCargaHoraria(
    minHoras: number,
    maxHoras?: number,
  ): Promise<ProjetoExtensao[]> {
    const query = this.repository
      .createQueryBuilder('projeto')
      .leftJoinAndSelect('projeto.atividadeExtensao', 'atividade');

    query.where('atividade.cargaHoraria >= :minHoras', { minHoras });

    if (maxHoras) {
      query.andWhere('atividade.cargaHoraria <= :maxHoras', { maxHoras });
    }

    return await query.getMany();
  }
}
