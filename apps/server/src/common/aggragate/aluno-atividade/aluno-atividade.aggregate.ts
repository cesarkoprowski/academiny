import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('aluno_atividade_extensao')
export default class AlunoAtividadeExtensao {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  alunoId: number;
  @Column()
  atividadeExtensaoId: number;
}
