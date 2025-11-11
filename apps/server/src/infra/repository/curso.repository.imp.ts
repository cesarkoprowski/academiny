import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import Curso from 'common/entities/curso/curso.entity';
import CursoRequestCreateDto from 'modules/curso/dto/request/curso-create.request.dto';
import ICursoRepository from 'modules/curso/repository/curso.repository';
import { Repository } from 'typeorm';
import { Modalidade } from 'modules/curso/enum/modalidade.enum';

@Injectable()
export default class CursoRepository implements ICursoRepository {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  async create(input: CursoRequestCreateDto): Promise<Curso> {
    const newCurso: Partial<Curso> = {
      cargaHorarioExtensao: input.cargaHorarioExtensao,
      modalidade: input.modalidade,
      nome: input.nome,
      turno: input.turno,
      vagas: input.vagas,
    };

    return await this.cursoRepository.save(newCurso);
  }

  async getById(id: number): Promise<Curso | null> {
    return await this.cursoRepository.findOneBy({ id });
  }

  async getAll(): Promise<Curso[]> {
    return await this.cursoRepository.find({
      order: { nome: 'ASC' },
    });
  }

  async update(
    id: number,
    input: Partial<CursoRequestCreateDto>,
  ): Promise<Curso | null> {
    const curso = await this.cursoRepository.findOneBy({ id });

    if (!curso) {
      return null;
    }

    const updatedCurso = this.cursoRepository.merge(curso, {
      ...(input.nome && { nome: input.nome }),
      ...(input.modalidade && { modalidade: input.modalidade }),
      ...(input.turno && { turno: input.turno }),
      ...(input.vagas !== undefined && { vagas: input.vagas }),
      ...(input.cargaHorarioExtensao !== undefined && {
        cargaHorarioExtensao: input.cargaHorarioExtensao,
      }),
    });

    return await this.cursoRepository.save(updatedCurso);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.cursoRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByNome(nome: string): Promise<Curso | null> {
    return await this.cursoRepository.findOneBy({ nome });
  }

  async findByModalidade(modalidade: Modalidade): Promise<Curso[]> {
    return await this.cursoRepository.find({
      where: { modalidade: modalidade },
      order: { nome: 'ASC' },
    });
  }
}
