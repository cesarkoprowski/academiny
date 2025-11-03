import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Pessoa from 'common/entities/pessoa/pessoa.entity';
import AlunoAtividadeExtensao from 'common/aggregate/aluno-atividade/aluno-atividade.aggregate';
import AlunoDisciplinas from 'common/aggregate/aluno-disciplina/aluno-disciplina.aggregate';
import AlunoProjetoExtensao from 'common/aggregate/aluno-projeto/aluno.projeto.aggregate';
import CursoDisciplina from 'common/aggregate/curso-disciplina/curso.disciplina.aggregate';
import DisciplinaAtividadeExtensao from 'common/aggregate/disciplina-atividade/disciplina-atividade.entity';
import ProfessorDisciplina from 'common/aggregate/professor-disciplina/professor.disciplina.aggregate';
import Aluno from 'common/entities/aluno/aluno.entity';
import AtividadeExtensao from 'common/entities/atividade/atividade.entity';
import Coordenador from 'common/entities/coordenador/coordenador.entity';
import Curso from 'common/entities/curso/curso.entity';
import Disciplina from 'common/entities/disciplina/disciplina.entity';
import Professor from 'common/entities/professor/professor.entity';
import ProjetoExtensao from 'common/entities/projeto/projeto.entity';

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
          Pessoa,
          Professor,
          Coordenador,
          Aluno,
          ProfessorDisciplina,
          AlunoProjetoExtensao,
          AlunoDisciplinas,
          Disciplina,
          Curso,
          ProjetoExtensao,
          AlunoAtividadeExtensao,
          DisciplinaAtividadeExtensao,
          CursoDisciplina,
          AtividadeExtensao,
        ],
        synchronize: true,
        autoLoadEntities: true,
        ssl: { rejectUnauthorized: false },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
