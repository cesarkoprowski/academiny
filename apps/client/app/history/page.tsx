import { Calendar, Clock, CheckCircle2, FileText, Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const completedActivities = [
  {
    id: 1,
    title: "Workshop de Desenvolvimento Web",
    hours: 20,
    completedDate: "2023-12-10",
    status: "Aprovada",
    feedback: "Excelente participação e documentação completa.",
  },
  {
    id: 2,
    title: "Mentoria para Alunos do Ensino Médio",
    hours: 30,
    completedDate: "2023-11-15",
    status: "Aprovada",
    feedback: "Demonstrou comprometimento e capacidade de ensino.",
  },
  {
    id: 3,
    title: "Projeto de Inovação Social",
    hours: 35,
    completedDate: "2023-10-20",
    status: "Aprovada",
    feedback: "Contribuição significativa para a comunidade.",
  },
]

export default function HistoryPage() {
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
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Atividades
                </Link>
                <Link href="/progress" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Meu Progresso
                </Link>
                <Link href="/history" className="text-sm font-medium text-foreground hover:text-primary">
                  Histórico
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="sm">
                Admin
              </Button>
              <div className="h-8 w-8 rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Histórico de Atividades</h1>
          <p className="text-muted-foreground">
            Todas as atividades de extensão que você completou
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              {completedActivities.map((activity, index) => (
                <Card key={activity.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{activity.title}</CardTitle>
                          <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            {activity.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Concluída em {new Date(activity.completedDate).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {activity.hours}h validadas
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="text-sm font-medium mb-1">Feedback do Professor:</div>
                      <p className="text-sm text-muted-foreground">{activity.feedback}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/activity/${activity.id}`}>
                        <FileText className="h-4 w-4 mr-2" />
                        Ver Detalhes
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumo Geral</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 rounded-lg bg-primary/10">
                  <div className="text-3xl font-bold text-primary">85h</div>
                  <div className="text-sm text-muted-foreground mt-1">Total de horas aprovadas</div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Atividades concluídas</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Taxa de aprovação</span>
                    <span className="font-medium text-primary">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Primeira atividade</span>
                    <span className="font-medium">Out/2023</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-base">Continue Participando</CardTitle>
                <CardDescription>
                  Explore mais atividades de extensão
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/">Ver Atividades Disponíveis</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
