import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Aluno from 'common/entities/aluno/aluno.entity';
import CreateAlunoRequestDTO from 'modules/professor/dto/request/create-aluno.request.dto';
import IAlunoRepository from 'modules/repository/aluno.repository';
import { Repository } from 'typeorm';

@Injectable()
export default class AlunoRepository implements IAlunoRepository {
  constructor(
    @InjectRepository(Aluno)
    private readonly repository: Repository<Aluno>,
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
  async getById(input: number): Promise<Aluno | null> {
    return await this.repository.findOneBy({
      id: input,
    });
  }
  async create(input: CreateAlunoRequestDTO): Promise<Aluno> {
    const newAluno: Partial<Aluno> = {
      cursoId: input.cursoId,
      matricula: input.matricula,
    };
    return await this.repository.save(newAluno);
  }
}
