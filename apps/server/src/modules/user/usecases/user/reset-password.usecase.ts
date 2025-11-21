import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import UserRepository from 'infra/repository/user.repository.imp';
import type IUserRepository from 'modules/user/repository/user.repository';
import PasswordResetRepository from 'infra/repository/password-reset.repository.imp';
import ResetPasswordRequestDto from 'modules/user/dto/request/reset-password.request.dto';
import AuthService from 'common/services/auth.service';

@Injectable()
export default class ResetPasswordUC
  implements IUseCase<ResetPasswordRequestDto, { message: string }>
{
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(PasswordResetRepository)
    private readonly passwordResetRepository: PasswordResetRepository,
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  async execute(input: ResetPasswordRequestDto): Promise<{ message: string }> {
    const resetRequest = await this.passwordResetRepository.findByEmailAndCode(
      input.email,
      input.code,
    );

    if (!resetRequest) {
      throw new BadRequestException('Código inválido ou já utilizado.');
    }

    if (new Date() > resetRequest.expiresAt) {
      throw new BadRequestException(
        'Código expirado. Solicite um novo código.',
      );
    }

    const user = await this.userRepository.getByEmail(input.email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const hashedPassword = await this.authService.createHash(input.newPassword);

    await this.userRepository.updatePassword(user.id, hashedPassword);

    await this.passwordResetRepository.markAsUsed(resetRequest.id);

    return { message: 'Senha atualizada com sucesso!' };
  }
}
