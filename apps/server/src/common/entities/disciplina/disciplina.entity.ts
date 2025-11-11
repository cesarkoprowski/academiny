import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('disciplina')
export default class Disciplina {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  codigo: string;

  @Column()
  cargaHorariaExtensao: number;
}
