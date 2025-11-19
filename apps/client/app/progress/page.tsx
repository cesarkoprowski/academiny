import { Clock, CheckCircle2, AlertCircle, FileText, Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const enrolledActivities = [
  {
    id: 1,
    title: "Projeto de Extensão em Tecnologia Social",
    hours: 40,
    completed: 25,
    status: "Em andamento",
    statusType: "progress",
  },
  {
    id: 2,
    title: "Oficinas de Programação para Jovens",
    hours: 30,
    completed: 30,
    status: "Aguardando aprovação",
    statusType: "pending",
  },
]

const notifications = [
  {
    id: 1,
    title: "Atividade Aprovada",
    message: "Sua participação em 'Oficinas de Programação' foi aprovada!",
    type: "success",
    date: "Há 2 horas",
  },
  {
    id: 2,
    title: "Documento Pendente",
    message: "Faça o upload da ficha de frequência da atividade 'Tecnologia Social'",
    type: "warning",
    date: "Há 1 dia",
  },
]

export default function ProgressPage() {
  const totalRequired = 200
  const totalCompleted = 85
  const progressPercentage = (totalCompleted / totalRequired) * 100

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
                <Link href="/progress" className="text-sm font-medium text-foreground hover:text-primary">
                  Meu Progresso
                </Link>
                <Link href="/history" className="text-sm font-medium text-muted-foreground hover:text-foreground">
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
          <h1 className="text-3xl font-bold mb-2">Meu Progresso</h1>
          <p className="text-muted-foreground">
            Acompanhe suas atividades de extensão e horas cumpridas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo de Horas</CardTitle>
                <CardDescription>
                  Acompanhe seu progresso até completar a carga horária obrigatória
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progresso Total</span>
                    <span className="text-sm text-muted-foreground">
                      {totalCompleted} de {totalRequired} horas
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-primary/10">
                    <div className="text-2xl font-bold text-primary">{totalCompleted}h</div>
                    <div className="text-xs text-muted-foreground mt-1">Cumpridas</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-chart-4/10">
                    <div className="text-2xl font-bold text-chart-4">55h</div>
                    <div className="text-xs text-muted-foreground mt-1">Em andamento</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <div className="text-2xl font-bold">{totalRequired - totalCompleted}h</div>
                    <div className="text-xs text-muted-foreground mt-1">Pendentes</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activities List */}
            <Card>
              <CardHeader>
                <CardTitle>Atividades Inscritas</CardTitle>
                <CardDescription>
                  Gerencie suas atividades em andamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active">
                  <TabsList className="mb-4">
                    <TabsTrigger value="active">Em Andamento</TabsTrigger>
                    <TabsTrigger value="pending">Aguardando Aprovação</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="active" className="space-y-4">
                    {enrolledActivities
                      .filter((a) => a.statusType === "progress")
                      .map((activity) => (
                        <Card key={activity.id}>
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg mb-2">
                                  {activity.title}
                                </CardTitle>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {activity.hours}h totais
                                  </span>
                                  <Badge variant="secondary">{activity.status}</Badge>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <div className="flex items-center justify-between mb-2 text-sm">
                                <span>Progresso</span>
                                <span className="text-muted-foreground">
                                  {activity.completed}/{activity.hours}h
                                </span>
                              </div>
                              <Progress 
                                value={(activity.completed / activity.hours) * 100} 
                                className="h-2"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/activity/${activity.id}`}>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Ver Detalhes
                                </Link>
                              </Button>
                              <Button size="sm">
                                Enviar Comprovação
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </TabsContent>

                  <TabsContent value="pending" className="space-y-4">
                    {enrolledActivities
                      .filter((a) => a.statusType === "pending")
                      .map((activity) => (
                        <Card key={activity.id}>
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg mb-2">
                                  {activity.title}
                                </CardTitle>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {activity.hours}h totais
                                  </span>
                                  <Badge variant="outline">{activity.status}</Badge>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                              <AlertCircle className="h-4 w-4" />
                              <span>Aguardando análise do professor</span>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/activity/${activity.id}`}>
                                Ver Detalhes
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="space-y-1">
                    <div className="flex items-start gap-2">
                      {notification.type === "success" ? (
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-chart-4 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium text-sm">{notification.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {notification.message}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {notification.date}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/">
                    Explorar Novas Atividades
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/history">
                    Ver Histórico Completo
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
