import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('disciplina')
export default class Disciplina {
  @PrimaryColumn()
  id: number;
  @Column()
  nome: string;
  @Column()
  codigo: string;
  @Column()
  cargaHorariaExtensao: number;
}
