import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import UserRepository from 'infra/repository/user.repository.imp';
import type IUserRepository from 'modules/user/repository/user.repository';
import PasswordResetRepository from 'infra/repository/password-reset.repository.imp';
import EmailService from 'common/services/email.service';
import ForgotPasswordRequestDto from 'modules/user/dto/request/forgot-password.request.dto';

@Injectable()
export default class ForgotPasswordUC
  implements IUseCase<ForgotPasswordRequestDto, { message: string }>
{
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(PasswordResetRepository)
    private readonly passwordResetRepository: PasswordResetRepository,
    @Inject(EmailService)
    private readonly emailService: EmailService,
  ) {}

  async execute(input: ForgotPasswordRequestDto): Promise<{ message: string }> {
    const user = await this.userRepository.getByEmail(input.email);
    const message =
      'Se o email existir em nossa base, um código de recuperação foi enviado.';

    if (!user) {
      return {
        message,
      };
    }

    const code = this.generateCode();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    await this.passwordResetRepository.create({
      email: input.email,
      code,
      expiresAt,
      used: false,
    });

    await this.emailService.sendPasswordResetEmail(input.email, code);

    return {
      message,
    };
  }

  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
