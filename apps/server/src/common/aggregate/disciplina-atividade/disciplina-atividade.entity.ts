import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('disciplina_atividade_extensao')

export default class DisciplinaAtividadeExtensao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  disciplinaId: number;

  @Column()
  atividadeExtensaoId: number;
}
