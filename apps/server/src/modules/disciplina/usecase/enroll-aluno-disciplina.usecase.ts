import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'common/interface/use-case.interface';
import { InjectRepository } from '@nestjs/typeorm';
import AlunoDisciplinas from 'common/aggregate/aluno-disciplina/aluno-disciplina.aggregate';
import { Repository } from 'typeorm';
import AlunoRepository from 'infra/repository/aluno.repository.imp';
import DisciplinaRepository from 'infra/repository/disciplina.repository.imp';
import EnrollAlunoDisciplinaRequestDto from '../dto/request/enroll-aluno-disciplina.request.dto';
import MessageResponseDto from 'modules/user/dto/response/message.response.dto';

@Injectable()
export default class EnrollAlunoDisciplinaUC
  implements IUseCase<EnrollAlunoDisciplinaRequestDto, MessageResponseDto>
{
  constructor(
    @InjectRepository(AlunoDisciplinas)
    private readonly alunoDisciplinaRepository: Repository<AlunoDisciplinas>,
    @Inject(AlunoRepository)
    private readonly alunoRepository: AlunoRepository,
    @Inject(DisciplinaRepository)
    private readonly disciplinaRepository: DisciplinaRepository,
  ) {}

  async execute(
    input: EnrollAlunoDisciplinaRequestDto,
  ): Promise<MessageResponseDto> {
    const aluno = await this.alunoRepository.getById(input.alunoId);
    if (!aluno) {
      throw new BadRequestException('Aluno não encontrado');
    }

    const disciplina = await this.disciplinaRepository.getById(
      input.disciplinaId,
    );
    if (!disciplina) {
      throw new BadRequestException('Disciplina não encontrada');
    }

    const existing = await this.alunoDisciplinaRepository.findOne({
      where: {
        alunoId: input.alunoId,
        disciplinaId: input.disciplinaId,
      },
    });

    if (existing) {
      throw new BadRequestException('Aluno já matriculado nesta disciplina');
    }

    await this.alunoDisciplinaRepository.save({
      alunoId: input.alunoId,
      disciplinaId: input.disciplinaId,
      anoCursado: input.anoCursado,
      anoSemestre: input.anoSemestre,
      horasExtensaoConcluida: 0,
      status: 'Cursando',
    });

    return { message: 'Aluno matriculado na disciplina com sucesso' };
  }
}
