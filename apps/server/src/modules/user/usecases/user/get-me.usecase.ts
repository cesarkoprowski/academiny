import { Inject, NotFoundException } from '@nestjs/common';
import UserRepository from 'infra/repository/user.repository.imp';
import GetMeResponseDTO from 'modules/user/dto/request/get-me.request.dto';

export default class GetMeUC {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  async execute(userId: number): Promise<GetMeResponseDTO> {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      cpf: user.cpf,
    };
  }
}
