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
  async getById(input: number): Promise<Pessoa | null> {
    return await this.repository.findOne({
      where: {
        id: input,
      },
    });
  }
  async getByEmail(input: string): Promise<Pessoa | null> {
    return await this.repository.findOne({
      where: {
        email: input,
      },
    });
  }

  async create(input: UserCreateRequestDTO): Promise<Pessoa> {
    const newPessoa: Partial<Pessoa> = {
      email: input.email,
      senhaHash: input.senha,
      cpf: input.cpf,
      nome: input.nome,
    };
    return await this.repository.save(newPessoa);
  }
}
