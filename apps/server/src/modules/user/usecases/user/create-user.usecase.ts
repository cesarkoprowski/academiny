import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import AuthService from 'common/services/auth.service';
import UserRepository from 'infra/repository/user.repository.imp';
import type IUserRepository from 'modules/user/repository/user.repository';
import UserCreateRequestDTO from 'modules/user/dto/request/user-create.request.dto';
import UserCreateResponseDTO from 'modules/user/dto/response/user.create.response';

@Injectable()
export default class CreateUserUC
  implements IUseCase<UserCreateRequestDTO, UserCreateResponseDTO>
{
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(input: UserCreateRequestDTO): Promise<UserCreateResponseDTO> {
    input.senha = await this.authService.createHash(input.senha);

    const newPessoa = await this.userRepository.create(input);

    const userCreateResponse = {
      cpf: newPessoa.cpf,
      email: newPessoa.email,
      id: newPessoa.id,
      nome: newPessoa.nome,
    };

    return userCreateResponse;
  }
}
