import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type IProjetoExtensaoRepository from '../repository/projeto.repository';
import ProjetoExtensaoRepository from 'infra/repository/projeto.repository.imp';
import { IUseCase } from 'common/interface/use-case.interface';
import SendNotificationUC from 'modules/notification/usecase/send-notification.usecase';
import AlunoProjetoRepository from 'infra/repository/aluno-projeto.repository.imp';

@Injectable()
export default class AcceptProjetoUC implements IUseCase<number, void> {
  constructor(
    @Inject(ProjetoExtensaoRepository)
    private readonly projetoRepository: IProjetoExtensaoRepository,
    @Inject(SendNotificationUC)
    private readonly sendNotificationUC: SendNotificationUC,
    @Inject(AlunoProjetoRepository)
    private readonly alunoProjetoRepository: AlunoProjetoRepository,
  ) {}

  async execute(input: number): Promise<void> {
    const projeto = await this.projetoRepository.getById(input);

    if (!projeto) {
      throw new NotFoundException(`Projeto com ID ${input} não encontrado`);
    }

    const alunoProjeto = await this.alunoProjetoRepository.findByProjeto(
      projeto.id,
    );

    if (!alunoProjeto) {
      throw new NotFoundException(
        'Projeto não possui aluno vinculado, contate o coordenador/diretor.',
      );
    }

    await this.projetoRepository.acceptProjeto(input);

    await this.sendNotificationUC.execute({
      title: 'Projeto Aprovado',
      message: 'Parabéns! Seu projeto foi aprovado.',
      destinationUserId: alunoProjeto.alunoId,
    });
  }
}
