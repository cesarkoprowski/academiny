import ProfessorDisciplina from 'common/aggregate/professor-disciplina/professor.disciplina.aggregate';
import Aluno from './aluno/aluno.entity';
import Coordenador from './coordenador/coordenador.entity';
import Pessoa from './pessoa/pessoa.entity';
import Professor from './professor/professor.entity';
import AlunoProjetoExtensao from 'common/aggregate/aluno-projeto/aluno.projeto.aggregate';
import AlunoDisciplinas from 'common/aggregate/aluno-disciplina/aluno-disciplina.aggregate';
import DisciplinaAtividadeExtensao from 'common/aggregate/disciplina-atividade/disciplina-atividade.entity';
import Curso from './curso/curso.entity';
import ProjetoExtensao from './projeto/projeto.entity';
import AlunoAtividadeExtensao from 'common/aggregate/aluno-atividade/aluno-atividade.aggregate';
import CursoDisciplina from 'common/aggregate/curso-disciplina/curso.disciplina.aggregate';
import AtividadeExtensao from './atividade/atividade.entity';
import Disciplina from './disciplina/disciplina.entity';

export const Entities = [
  Pessoa,
  Professor,
  Coordenador,
  Aluno,
  ProfessorDisciplina,
  AlunoProjetoExtensao,
  AlunoDisciplinas,
  DisciplinaAtividadeExtensao,
  Curso,
  ProjetoExtensao,
  AlunoAtividadeExtensao,
  CursoDisciplina,
  AtividadeExtensao,
  Disciplina,
];
