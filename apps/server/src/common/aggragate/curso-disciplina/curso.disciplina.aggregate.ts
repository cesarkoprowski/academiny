import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('curso_disciplina')
export default class CursoDisciplina {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  cursoId: number;
  @Column()
  disciplinaId: number;
}
