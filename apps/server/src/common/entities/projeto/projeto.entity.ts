import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projeto_extensao')
export default class ProjetoExtensao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  atividadeExtensao: number;

  @Column()
  professorAvaliadorId: number;

  @Column()
  resumo: string;

  @Column()
  status: 'Reprovado' | 'Aprovado' | 'Pendente';

  @Column()
  urlAnexo: string;

  @Column()
  feedbackProfessor: string;
}
