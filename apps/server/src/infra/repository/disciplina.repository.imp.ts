import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import Disciplina from 'common/entities/disciplina/disciplina.entity';
import IDisciplinaRepository from 'modules/disciplina/repository/disciplina.repository';
import DisciplinaCreateRequestDto from 'modules/disciplina/dto/request/disciplina-create.request.dto';

@Injectable()
export default class DisciplinaRepository implements IDisciplinaRepository {
  constructor(
    @InjectRepository(Disciplina)
    private readonly disciplinaRepository: Repository<Disciplina>,
  ) {}

  async create(input: DisciplinaCreateRequestDto): Promise<Disciplina> {
    const newDisciplina: Partial<Disciplina> = {
      nome: input.nome,
      codigo: input.codigo,
      cargaHorariaExtensao: input.cargaHorariaExtensao,
    };

    return await this.disciplinaRepository.save(newDisciplina);
  }
}
