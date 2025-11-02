import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import AlunoAtividadeExtensao from 'src/common/aggragate/aluno-atividade/aluno-atividade.aggregate';
import AlunoDisciplinas from 'src/common/aggragate/aluno-disciplina/aluno-disciplina.aggregate';
import AlunoProjetoExtensao from 'src/common/aggragate/aluno-projeto/aluno.projeto.aggregate';
import CursoDisciplina from 'src/common/aggragate/curso-disciplina/curso.disciplina.aggregate';
import DisciplinaAtividadeExtensao from 'src/common/aggragate/disciplina-atividade/disciplina-atividade.entity';
import ProfessorDisciplina from 'src/common/aggragate/professor-disciplina/professor.disciplina.aggregate';
import Aluno from 'src/common/entities/aluno/aluno.entity';
import AtividadeExtensao from 'src/common/entities/atividade/atividade.entity';
import Coordenador from 'src/common/entities/coordenador/coordenador.entity';
import Curso from 'src/common/entities/curso/curso.entity';
import Disciplina from 'src/common/entities/disciplina/disciplina.entity';
import Professor from 'src/common/entities/professor/professor.entity';
import ProjetoExtensao from 'src/common/entities/projeto/projeto.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: 5432,
        username: process.env.DB_USERNAME || 'user',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'academiny',
        entities: [
          AlunoAtividadeExtensao,
          AlunoDisciplinas,
          AlunoProjetoExtensao,
          CursoDisciplina,
          DisciplinaAtividadeExtensao,
          ProfessorDisciplina,
          Aluno,
          AtividadeExtensao,
          Coordenador,
          Curso,
          Disciplina,
          Professor,
          ProjetoExtensao,
        ],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
