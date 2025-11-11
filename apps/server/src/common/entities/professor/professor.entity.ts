import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Pessoa from '../pessoa/pessoa.entity';

@Entity('professor')
export default class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigoCps: string;

  @OneToOne(() => Pessoa, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: Pessoa;
}
