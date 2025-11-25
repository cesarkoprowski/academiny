import { Inject, UnauthorizedException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import AuthService from 'common/services/auth.service';
import UserRepository from 'infra/repository/user.repository.imp';
import type IUserRepository from 'modules/user/repository/user.repository';
import LoginRequestDTO from 'modules/user/dto/request/login.request';
import LoginResponseDTO from 'modules/user/dto/response/login.response.dto';

export default class LoginUC
  implements IUseCase<LoginRequestDTO, LoginResponseDTO>
{
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(input: LoginRequestDTO): Promise<LoginResponseDTO> {
    const userBD = await this.userRepository.getByEmail(input.email);

    if (!userBD) throw new UnauthorizedException('Nenhum dado correspondente foi encontrado');

    const isValid = await this.authService.validatePassword(
      input.senha,
      userBD.senhaHash,
    );

    if (!isValid) throw new UnauthorizedException('Nenhum dado correspondente foi encontrado');

    const jwt = this.authService.generateToken(
      userBD.id,
      userBD.email,
      userBD.isAdmin,
    );

    return {
      token: jwt,
    };
  }
}
