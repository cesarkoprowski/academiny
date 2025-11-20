import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import AlunoDisciplinaRepository from 'infra/repository/aluno-disciplina.repository.imp';
import MessageResponseDto from 'modules/user/dto/response/message.response.dto';
import UnenrollAlunoDisciplinaRequestDto from '../dto/request/unenroll-aluno-disciplina.request.dto';

@Injectable()
export default class UnenrollAlunoDisciplinaUC
  implements IUseCase<UnenrollAlunoDisciplinaRequestDto, MessageResponseDto>
{
  constructor(
    @Inject(AlunoDisciplinaRepository)
    private readonly alunoDisciplinaRepository: AlunoDisciplinaRepository,
  ) {}

  async execute(
    input: UnenrollAlunoDisciplinaRequestDto,
  ): Promise<MessageResponseDto> {
    const enrollment = await this.alunoDisciplinaRepository.getAll();
    const found = enrollment.find(
      (e) =>
        e.alunoId === input.alunoId && e.disciplinaId === input.disciplinaId,
    );

    if (!found) {
      throw new NotFoundException('Matrícula não encontrada');
    }

    await this.alunoDisciplinaRepository.delete(found.id);

    return { message: 'Aluno desmatriculado da disciplina com sucesso' };
  }
}
