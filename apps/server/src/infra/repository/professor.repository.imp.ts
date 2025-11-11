import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Pessoa from 'common/entities/pessoa/pessoa.entity';
import Professor from 'common/entities/professor/professor.entity';
import IProfessorRepository from 'modules/repository/professor.repository';
import CreateTeacherRequestDTO from 'modules/admin/dto/request/create-teacher.request.dto';
import { Repository } from 'typeorm';

@Injectable()
export default class ProfessorRepository implements IProfessorRepository {
  constructor(
    @InjectRepository(Professor)
    private readonly repository: Repository<Professor>,
  ) {}
  getAll(input: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(input: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  update(input: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async getById(input: number): Promise<Professor | null> {
    return await this.repository.findOneBy({
      id: input,
    });
  }
  async create(input: CreateTeacherRequestDTO): Promise<Professor> {
    const newProfessor: Partial<Professor> = {
      codigoCps: input.codigoCps,
      pessoa: {
        id: input.id,
      } as Pessoa,
    };
    return await this.repository.save(newProfessor);
  }
}
