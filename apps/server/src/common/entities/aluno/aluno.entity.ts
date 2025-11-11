import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Pessoa from '../pessoa/pessoa.entity';

@Entity('aluno')
export default class Aluno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  matricula: string;

  @Column()
  cursoId: number;

  @OneToOne(() => Pessoa, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: Pessoa;
}
