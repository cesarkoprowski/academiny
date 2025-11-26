import {
  Users,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const pendingSubmissions = [
  {
    id: 1,
    studentName: "Maria Santos",
    activityTitle: "Projeto de Extensão em Tecnologia Social",
    submittedDate: "2024-01-15",
    hours: 40,
    documentLink: "https://drive.google.com/...",
  },
];

const activities = [
  {
    id: 1,
    title: "Projeto de Extensão em Tecnologia Social",
    status: "Ativa",
    enrolled: 15,
    capacity: 20,
    hours: 40,
  },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Painel administrativo</h1>
            <p className="text-muted-foreground">
              Gerencie atividades e avalie submissões de alunos
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/admin/activity/new">
              <Plus className="h-4 w-4" />
              Nova Atividade
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Atividades Ativas
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Alunos Inscritos
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Aguardando Análise
              </CardTitle>
              <Clock className="h-4 w-4 text-chart-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-4">8</div>
              <p className="text-xs text-muted-foreground mt-1">
                Necessita atenção
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="submissions" className="space-y-6">
          <TabsList className="w-full">
            <TabsTrigger className="cursor-pointer" value="reports">Alunos</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="activities">Atividades</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="submissions">Projetos</TabsTrigger>
          </TabsList>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por aluno ou atividade..."
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            <div className="space-y-4">
              {pendingSubmissions.map((submission) => (
                <Card key={submission.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {submission.studentName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {submission.studentName}
                            </CardTitle>
                            <CardDescription>
                              {submission.activityTitle}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="shrink-0">
                        {submission.hours}h
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span>
                        Enviado em{" "}
                        {new Date(submission.submittedDate).toLocaleDateString(
                          "pt-BR"
                        )}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Há{" "}
                        {Math.floor(
                          (Date.now() -
                            new Date(submission.submittedDate).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        dias
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-muted">
                      <a
                        href={submission.documentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline break-all"
                      >
                        {submission.documentLink}
                      </a>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild className="flex-1">
                        <Link href={`/admin/review/${submission.id}`}>
                          Analisar Submissão
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <a
                          href={submission.documentLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Abrir Drive
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar atividade..." className="pl-9" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            <div className="grid gap-4">
              {activities.map((activity) => (
                <Card key={activity.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">
                            {activity.title}
                          </CardTitle>
                          <Badge
                            variant={
                              activity.status === "Ativa"
                                ? "default"
                                : activity.status === "Inscrições Abertas"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {activity.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {activity.enrolled}/{activity.capacity} inscritos
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {activity.hours}h
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/activity/${activity.id}/edit`}>
                        Editar
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/activity/${activity.id}/students`}>
                        Ver Alunos
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      {activity.status === "Ativa" ? "Desativar" : "Reativar"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Relatório de Atividades</CardTitle>
                  <CardDescription>
                    Visão geral de todas as atividades cadastradas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Gerar Relatório PDF
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Relatório de Participação</CardTitle>
                  <CardDescription>
                    Adesão por curso e matriz curricular
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Gerar Relatório PDF
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Horas Totais Registradas</CardTitle>
                  <CardDescription>
                    Total de horas de extensão por período
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Gerar Relatório PDF
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Relatório de Aprovações</CardTitle>
                  <CardDescription>
                    Taxa de aprovação e feedbacks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Gerar Relatório PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
