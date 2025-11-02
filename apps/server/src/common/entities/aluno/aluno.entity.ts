import { Column, Entity } from 'typeorm';
import Pessoa from '../pessoa/pessoa.entity';

@Entity('aluno')
export default class Aluno extends Pessoa {
  @Column()
  matricula: string;
  @Column()
  cursoId: number;
}
