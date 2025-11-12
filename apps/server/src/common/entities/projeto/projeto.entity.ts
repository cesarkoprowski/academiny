import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import AtividadeExtensao from '../atividade/atividade.entity';
import Professor from '../professor/professor.entity';
import { EProjetoStatus } from 'modules/projeto/enum/projeto-status.enum';

@Entity('projeto_extensao')
export default class ProjetoExtensao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nome: string;

  @ManyToOne(() => AtividadeExtensao)
  @JoinColumn({ name: 'atividade_extensao_id' })
  atividadeExtensao: AtividadeExtensao;

  @ManyToOne(() => Professor)
  @JoinColumn({ name: 'professor_id' })
  professorAvaliadorId: Professor;

  @Column()
  resumo: string;

  @Column({
    type: 'enum',
    enum: EProjetoStatus,
    default: EProjetoStatus.PENDENTE,
  })
  status: EProjetoStatus;

  @Column({ nullable: true })
  urlAnexo: string;

  @Column({ nullable: true })
  feedbackProfessor: string;
}
