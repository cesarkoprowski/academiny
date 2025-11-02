export default class AlunoDisciplinas {
  id: number;
  alunoId: number;
  disciplinaId: number;
  anoCursado: number;
  anoSemestre: 1 | 2;
  horasExtensaoConcluida: number;
  status: 'Aprovado' | 'Reprovado' | 'Cursando';
}
