import { ArrowLeft, ExternalLink, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function ReviewSubmissionPage() {
  const submission = {
    id: 1,
    studentName: "Maria Santos",
    studentEmail: "maria.santos@universidade.edu.br",
    studentCourse: "Ciência da Computação",
    activityTitle: "Projeto de Extensão em Tecnologia Social",
    submittedDate: "2024-01-15",
    hours: 40,
    documentLink: "https://drive.google.com/drive/folders/example",
    selfEvaluation: "Participei ativamente do desenvolvimento de um sistema web para cadastro de famílias em situação de vulnerabilidade. Foi uma experiência enriquecedora que me permitiu aplicar conhecimentos de React e Node.js em um contexto real, além de desenvolver habilidades de trabalho em equipe e comunicação com a comunidade.",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary" />
                <span className="text-xl font-bold">Academiny</span>
              </Link>
              <Badge variant="secondary">Análise de Submissão</Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin">Voltar ao Painel</Link>
              </Button>
              <div className="h-8 w-8 rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/admin">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para submissões pendentes
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Análise de Submissão</h1>
              <p className="text-muted-foreground">
                Revise os documentos e forneça feedback para o aluno
              </p>
            </div>

            {/* Student Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações do Aluno</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xl font-medium text-primary">
                      {submission.studentName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{submission.studentName}</div>
                    <div className="text-sm text-muted-foreground">{submission.studentEmail}</div>
                    <div className="text-sm text-muted-foreground">{submission.studentCourse}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Info */}
            <Card>
              <CardHeader>
                <CardTitle>Atividade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-lg mb-1">{submission.activityTitle}</div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Carga horária: {submission.hours}h</span>
                      <span>Enviado em {new Date(submission.submittedDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Documentos Enviados</CardTitle>
                <CardDescription>
                  Acesse o link para revisar todos os materiais submetidos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted border">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="font-medium mb-1">Link dos Documentos</div>
                      <a 
                        href={submission.documentLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline break-all"
                      >
                        {submission.documentLink}
                      </a>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <a href={submission.documentLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Abrir
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                  <strong>Checklist de Verificação:</strong>
                  <ul className="mt-2 space-y-1 ml-4 list-disc">
                    <li>Ficha de frequência preenchida e assinada</li>
                    <li>Relatório de atividades completo</li>
                    <li>Evidências fotográficas ou documentais</li>
                    <li>Formulário de autoavaliação preenchido</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Self Evaluation */}
            <Card>
              <CardHeader>
                <CardTitle>Autoavaliação do Aluno</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {submission.selfEvaluation}
                </p>
              </CardContent>
            </Card>

            <Separator />

            {/* Feedback Form */}
            <Card>
              <CardHeader>
                <CardTitle>Feedback e Decisão</CardTitle>
                <CardDescription>
                  Forneça um feedback detalhado sobre a submissão
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback para o Aluno</Label>
                  <Textarea 
                    id="feedback"
                    placeholder="Descreva sua análise dos documentos e orientações para o aluno..."
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    Este feedback será enviado ao aluno junto com a decisão
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button size="lg" className="flex-1">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    Aprovar Submissão
                  </Button>
                  <Button size="lg" variant="destructive" className="flex-1">
                    <XCircle className="h-5 w-5 mr-2" />
                    Reprovar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-base">Diretrizes de Avaliação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="font-medium mb-1">✓ Aprovar se:</div>
                  <ul className="space-y-1 text-muted-foreground ml-4 list-disc">
                    <li>Todos os documentos estão completos</li>
                    <li>Carga horária foi cumprida</li>
                    <li>Evidências são suficientes</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <div className="font-medium mb-1">✗ Reprovar se:</div>
                  <ul className="space-y-1 text-muted-foreground ml-4 list-disc">
                    <li>Documentação incompleta</li>
                    <li>Falta de evidências</li>
                    <li>Horas insuficientes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Histórico do Aluno</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Atividades concluídas</span>
                  <span className="font-medium">3</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Horas totais</span>
                  <span className="font-medium">120h</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Taxa de aprovação</span>
                  <span className="font-medium text-primary">100%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
