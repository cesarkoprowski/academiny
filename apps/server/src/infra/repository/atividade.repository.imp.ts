import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AtividadeExtensao from 'common/entities/atividade/atividade.entity';
import AtividadeExtensaoCreateRequestDto from 'modules/atividade/dto/request/atividade-create.request.dto';
import IAtividadeExtensaoRepository from 'modules/atividade/repository/atividade.repository';
import { Repository } from 'typeorm';

@Injectable()
export default class AtividadeExtensaoRepository
  implements IAtividadeExtensaoRepository
{
  constructor(
    @InjectRepository(AtividadeExtensao)
    private readonly repository: Repository<AtividadeExtensao>,
  ) {}
  async create(
    input: AtividadeExtensaoCreateRequestDto,
  ): Promise<AtividadeExtensao> {
    const newAtividadeExtensao: Partial<AtividadeExtensao> = {
      titulo: input.titulo,
      descricao: input.descricao,
      cargaHoraria: input.cargaHoraria,
    };
    return await this.repository.save(newAtividadeExtensao);
  }

  async getById(id: number): Promise<AtividadeExtensao | null> {
    return await this.repository.findOneBy({ id });
  }

  async getAll(): Promise<AtividadeExtensao[]> {
    return await this.repository.find({
      relations: ['disciplinaAtividades', 'disciplinaAtividades.disciplina'],
      order: { id: 'DESC' },
    });
  }

  async update(
    id: number,
    input: Partial<AtividadeExtensaoCreateRequestDto>,
  ): Promise<AtividadeExtensao | null> {
    const atividade = await this.repository.findOneBy({ id });

    if (!atividade) {
      return null;
    }

    const updatedAtividade = this.repository.merge(atividade, {
      ...(input.titulo && { titulo: input.titulo }),
      ...(input.descricao && { descricao: input.descricao }),
      ...(input.cargaHoraria && { cargaHoraria: input.cargaHoraria }),
    });

    return await this.repository.save(updatedAtividade);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByTitulo(titulo: string): Promise<AtividadeExtensao[]> {
    return await this.repository
      .createQueryBuilder('atividade')
      .where('atividade.titulo ILIKE :titulo', { titulo: `%${titulo}%` })
      .getMany();
  }

  async findByCargaHoraria(
    minHoras: number,
    maxHoras?: number,
  ): Promise<AtividadeExtensao[]> {
    const query = this.repository.createQueryBuilder('atividade');

    query.where('atividade.cargaHoraria >= :minHoras', { minHoras });

    if (maxHoras) {
      query.andWhere('atividade.cargaHoraria <= :maxHoras', { maxHoras });
    }

    return await query.getMany();
  }
}
