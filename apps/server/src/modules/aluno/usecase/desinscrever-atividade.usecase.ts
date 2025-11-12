import { IUseCase } from 'common/interface/use-case.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import UnsubscribeAtividadeRequestDto from '../dto/request/unsubscribe-atividade.request.dto';
import UnsubscribeAtividadeResponseDto from '../dto/response/unsubscribe-atividade.response.dto';
import AlunoAtividadeRepository from 'infra/repository/aluno-atividade.repository.imp';

@Injectable()
export default class UnsubscribeActivityUC
  implements
    IUseCase<UnsubscribeAtividadeRequestDto, UnsubscribeAtividadeResponseDto>
{
  constructor(
    @Inject(AlunoAtividadeRepository)
    private readonly alunoAtividadeRepository: AlunoAtividadeRepository,
  ) {}

  async execute(
    input: UnsubscribeAtividadeRequestDto,
  ): Promise<UnsubscribeAtividadeResponseDto> {
    const subscription =
      await this.alunoAtividadeRepository.findByAlunoAndAtividade(
        input.alunoId,
        input.atividadeExtensaoId,
      );

    if (!subscription) {
      throw new NotFoundException('Inscrição não encontrada');
    }

    const success = await this.alunoAtividadeRepository.delete(subscription.id);

    return { success };
  }
}
