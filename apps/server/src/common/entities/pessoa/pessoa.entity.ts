import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pessoa')

export default class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  senhaHash: string;
}
