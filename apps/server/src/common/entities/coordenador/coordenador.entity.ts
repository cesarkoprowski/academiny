import { Column, Entity } from 'typeorm';
import Professor from '../professor/professor.entity';

@Entity("coordenador")

export default class Coordenador extends Professor {
  @Column()
  cursoId: number;
}
