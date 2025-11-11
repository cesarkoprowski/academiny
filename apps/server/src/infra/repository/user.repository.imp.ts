import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Pessoa from 'common/entities/pessoa/pessoa.entity';
import IUserRepository from 'modules/user/repository/user.repository';
import UserCreateRequestDTO from 'modules/user/dto/request/user-create.request.dto';
import { Repository } from 'typeorm';

@Injectable()
export default class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(Pessoa)
    private readonly repository: Repository<Pessoa>,
  ) {}
  async create(input: UserCreateRequestDTO): Promise<Pessoa> {
    const newPessoa: Partial<Pessoa> = {
      email: input.email,
      senhaHash: input.senha,
      cpf: input.cpf,
      nome: input.nome,
    };
    return await this.repository.save(newPessoa);
  }

  async getById(id: number): Promise<Pessoa | null> {
    return await this.repository.findOneBy({ id });
  }

  async getByEmail(email: string): Promise<Pessoa | null> {
    return await this.repository.findOneBy({ email });
  }

  async getAll(): Promise<Pessoa[]> {
    return await this.repository.find({
      order: { id: 'DESC' },
    });
  }

  async update(
    id: number,
    input: Partial<UserCreateRequestDTO>,
  ): Promise<Pessoa | null> {
    const pessoa = await this.repository.findOneBy({ id });

    if (!pessoa) {
      return null;
    }

    const updatedPessoa = this.repository.merge(pessoa, {
      ...(input.nome && { nome: input.nome }),
      ...(input.email && { email: input.email }),
      ...(input.cpf && { cpf: input.cpf }),
      ...(input.senha && { senhaHash: input.senha }),
    });

    return await this.repository.save(updatedPessoa);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByCpf(cpf: string): Promise<Pessoa | null> {
    return await this.repository.findOneBy({ cpf });
  }

  async findByNome(nome: string): Promise<Pessoa[]> {
    return await this.repository
      .createQueryBuilder('pessoa')
      .where('pessoa.nome ILIKE :nome', { nome: `%${nome}%` })
      .getMany();
  }
}
