import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Pessoa from '../pessoa/pessoa.entity';

@Entity('notification')
export default class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column({ default: false })
  read: boolean;

  @ManyToOne(() => Pessoa)
  @JoinColumn({ name: 'destination_user_id' })
  destinationUserId: number;
}
