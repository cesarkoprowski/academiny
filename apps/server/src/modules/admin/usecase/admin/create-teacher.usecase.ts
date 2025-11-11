import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import ProfessorRepository from 'infra/repository/professor.repository.imp';
import UserRepository from 'infra/repository/user.repository.imp';
import type IProfessorRepository from 'modules/repository/professor.repository';
import type IUserRepository from 'modules/user/repository/user.repository';
import CreateTeacherRequestDTO from 'modules/admin/dto/request/create-teacher.request.dto';
import CreateTeacherResponseDTO from 'modules/admin/dto/response/create-teacher.response.dto';

@Injectable()
export default class CreateTeacherUC
  implements IUseCase<CreateTeacherRequestDTO, CreateTeacherResponseDTO>
{
  constructor(
    @Inject(UserRepository)
    private readonly pessoaRepository: IUserRepository,
    @Inject(ProfessorRepository)
    private readonly professorRepository: IProfessorRepository,
  ) {}

  async execute(
    input: CreateTeacherRequestDTO,
  ): Promise<CreateTeacherResponseDTO> {
    const pessoa = await this.pessoaRepository.getByEmail(input.email);
    input.id = pessoa?.id;

    if (!pessoa)
      throw new NotFoundException('Não foi encontrado alguem com este email');

    const professor = await this.professorRepository.create(input);

    const createTeacherResponse = {
      codigoCps: input.codigoCps,
      teacherId: professor.id,
      userId: pessoa.id,
    };

    return createTeacherResponse;
  }
}
