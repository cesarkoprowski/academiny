import { IUseCase } from 'common/interface/use-case.interface';
import { Inject, Injectable } from '@nestjs/common';
import SubscribeAtividadeRequestDto from '../dto/request/subscribe-atividade.request.dto';
import SubscribeAtividadeResponseDto from '../dto/response/subscribe-atividade.response.dto';
import AlunoAtividadeRepository from 'infra/repository/aluno-atividade.repository.imp';
import AlunoRepository from 'infra/repository/aluno.repository.imp';
import AtividadeExtensaoRepository from 'infra/repository/atividade.repository.imp';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export default class SubscribeActivityUC
  implements
    IUseCase<SubscribeAtividadeRequestDto, SubscribeAtividadeResponseDto>
{
  constructor(
    @Inject(AlunoAtividadeRepository)
    private readonly alunoAtividadeRepository: AlunoAtividadeRepository,
    @Inject(AlunoRepository)
    private readonly alunoRepository: AlunoRepository,
    @Inject(AtividadeExtensaoRepository)
    private readonly atividadeRepository: AtividadeExtensaoRepository,
  ) {}

  async execute(
    input: SubscribeAtividadeRequestDto,
  ): Promise<SubscribeAtividadeResponseDto> {
    const aluno = await this.alunoRepository.getById(input.alunoId);
    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    const atividade = await this.atividadeRepository.getById(
      input.atividadeExtensaoId,
    );
    if (!atividade) {
      throw new NotFoundException('Atividade de extensão não encontrada');
    }

    const subscription = await this.alunoAtividadeRepository.create({
      alunoId: input.alunoId,
      atividadeExtensaoId: input.atividadeExtensaoId,
    });

    return {
      id: subscription.id,
      alunoId: subscription.alunoId,
      atividadeExtensaoId: subscription.atividadeExtensaoId,
    };
  }
}
