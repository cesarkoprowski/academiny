import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Professor from '../professor/professor.entity';

@Entity('coordenador')
export default class Coordenador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cursoId: number;

  @OneToOne(() => Professor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;
}
