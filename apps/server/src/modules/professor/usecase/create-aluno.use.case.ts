import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import UserRepository from 'infra/repository/user.repository.imp';
import AlunoCreateResponseDTO from '../dto/response/create-aluno.response.dto';
import AlunoCreateRequestDTO from '../dto/request/create-aluno.request.dto';
import type IAlunoRepository from '../../repository/aluno.repository';
import AlunoRepository from 'infra/repository/aluno.repository.imp';

@Injectable()
export default class CreateAlunoUC
  implements IUseCase<AlunoCreateRequestDTO, AlunoCreateResponseDTO>
{
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(AlunoRepository)
    private readonly alunoRepository: IAlunoRepository,
  ) {}

  async execute(input: AlunoCreateRequestDTO): Promise<AlunoCreateResponseDTO> {
    const pessoa = await this.userRepository.getByEmail(input.email);

    if (!pessoa)
      throw new NotFoundException(
        'Não foi encontrado nenhuma pessoa com esse id',
      );

    const aluno = await this.alunoRepository.create(input);

    const createAlunoResponse: AlunoCreateResponseDTO = {
      cursoId: aluno.cursoId,
      id: aluno.cursoId,
      matricula: aluno.matricula,
    };

    return createAlunoResponse;
  }
}
