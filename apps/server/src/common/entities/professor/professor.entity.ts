import { Column, Entity } from 'typeorm';
import Pessoa from '../pessoa/pessoa.entity';

@Entity('professor')

export default class Professor extends Pessoa {
  @Column()
  codigoCps: string;
}
