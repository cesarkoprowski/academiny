import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('aluno_projeto_extensao')

export default class AlunoProjetoExtensao {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  alunoId: number;

  @Column()
  projetoExtensaoId: number;
}
