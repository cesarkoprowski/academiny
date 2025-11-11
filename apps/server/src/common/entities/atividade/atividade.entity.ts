import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('atividade_extensao')
export default class AtividadeExtensao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column()
  cargaHoraria: number;
}
