import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Modalidade } from 'modules/curso/enum/modalidade.enum';
import { Turno } from 'modules/curso/enum/turno.enum';

@Entity('curso')
export default class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nome: string;

  @Column({ type: 'enum', enum: Modalidade })
  modalidade: Modalidade;

  @Column({ type: 'enum', enum: Turno })
  turno: Turno;

  @Column()
  vagas: number;

  @Column()
  cargaHorariaExtensao: number;
}
