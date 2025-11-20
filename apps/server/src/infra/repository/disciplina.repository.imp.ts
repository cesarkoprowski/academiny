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

  async getById(id: number): Promise<Disciplina | null> {
    return await this.disciplinaRepository.findOneBy({ id });
  }

  async getAll(): Promise<Disciplina[]> {
    return await this.disciplinaRepository.find({
      order: { id: 'DESC' },
    });
  }

  async getAllWithProfessores(): Promise<any[]> {
    const query = `
      SELECT 
        d.id as "disciplinaId",
        d.nome as "disciplinaNome",
        d.carga_horaria_extensao as "cargaHoraria",
        d.codigo as "codigo",
        json_agg(
          json_build_object(
            'professorId', prof.id,
            'nome', p.nome,
            'email', p.email,
            'codigoCps', prof.codigo_cps
          )
        ) FILTER (WHERE prof.id IS NOT NULL) as professores
      FROM disciplina d
      LEFT JOIN professor_disciplina pd ON d.id = pd.disciplina_id
      LEFT JOIN professor prof ON pd.professor_id = prof.id
      LEFT JOIN pessoa p ON prof.pessoa_id = p.id
      GROUP BY d.id, d.nome, d.carga_horaria_extensao, d.codigo
      ORDER BY d.id DESC
    `;

    return await this.disciplinaRepository.query(query);
  }

  async update(
    id: number,
    input: Partial<DisciplinaCreateRequestDto>,
  ): Promise<Disciplina | null> {
    const disciplina = await this.disciplinaRepository.findOneBy({ id });

    if (!disciplina) {
      return null;
    }

    const updatedDisciplina = this.disciplinaRepository.merge(disciplina, {
      ...(input.nome && { nome: input.nome }),
      ...(input.codigo && { codigo: input.codigo }),
      ...(input.cargaHorariaExtensao !== undefined && {
        cargaHorariaExtensao: input.cargaHorariaExtensao,
      }),
    });

    return await this.disciplinaRepository.save(updatedDisciplina);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.disciplinaRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByCodigo(codigo: string): Promise<Disciplina | null> {
    return await this.disciplinaRepository.findOneBy({ codigo });
  }

  async findByNome(nome: string): Promise<Disciplina[]> {
    return await this.disciplinaRepository
      .createQueryBuilder('disciplina')
      .where('disciplina.nome ILIKE :nome', { nome: `%${nome}%` })
      .orderBy('disciplina.nome', 'ASC')
      .getMany();
  }
}
