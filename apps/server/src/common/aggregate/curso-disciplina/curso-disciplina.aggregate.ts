import Curso from 'common/entities/curso/curso.entity';
import Disciplina from 'common/entities/disciplina/disciplina.entity';
import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('curso_disciplina')
@Unique(['curso', 'disciplina'])
export default class CursoDisciplina {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Curso, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'curso_id' })
  curso: Curso;

  @ManyToOne(() => Disciplina,  {onDelete: 'CASCADE' })
  @JoinColumn({ name: 'disciplina_id' })
  disciplina: Disciplina;
}
