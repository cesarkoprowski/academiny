import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('professor_disciplina')

export default class ProfessorDisciplina {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  disciplinaId: number;

  @Column()
  professorId: number;
}
