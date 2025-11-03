import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('curso')

export default class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  modalidade: 'presencial' | 'hibrido' | 'EAD';

  @Column()
  turno: 'matutino' | 'verspertino' | 'noturno';

  @Column()
  vagas: number;

  @Column()
  cargaHorarioExtensao: number;
}
