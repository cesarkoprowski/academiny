import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('aluno_disciplina')
export default class AlunoDisciplinas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  alunoId: number;

  @Column()
  disciplinaId: number;

  @Column()
  anoCursado: number;

  @Column()
  anoSemestre: 1 | 2;

  @Column()
  horasExtensaoConcluida: number;

  @Column()
  status: 'Aprovado' | 'Reprovado' | 'Cursando';
}
