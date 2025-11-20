import { Inject, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import UserRepository from 'infra/repository/user.repository.imp';
import type IUserRepository from 'modules/user/repository/user.repository';
import UpdateUserRequestDTO from 'modules/user/dto/request/user-create.request.dto copy';

export default class UpdateUserUC
  implements IUseCase<{ input: UpdateUserRequestDTO; id: number }, void>
{
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(params: {
    input: UpdateUserRequestDTO;
    id: number;
  }): Promise<void> {
    const user = await this.userRepository.update(params.id, params.input);

    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
