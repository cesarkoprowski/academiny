import { InjectRepository } from '@nestjs/typeorm';
import Curso from 'common/entities/curso/curso.entity';
import CursoRequestCreateDto from 'modules/curso/dto/request/curso-create.request.dto';
import ICursoRepository from 'modules/curso/repository/curso.repository';
import { Repository } from 'typeorm';

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
}
