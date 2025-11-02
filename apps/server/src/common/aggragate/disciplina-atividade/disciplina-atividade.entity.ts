import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('disciplinas_atividade_extensao')
export default class DisciplinaAtividadeExtensao {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  disciplinaId: number;
  @Column()
  atividadeExtensaoId: number;
}
