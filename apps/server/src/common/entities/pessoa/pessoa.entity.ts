import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pessoa')
export default class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senhaHash: string;

  @Column({ default: 'false', type: 'boolean' })
  isAdmin: boolean = false;
}
