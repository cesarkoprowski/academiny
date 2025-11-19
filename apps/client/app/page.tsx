import { BookOpen, Clock, Users, Bell, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const activities = [
  {
    id: 1,
    title: "Projeto de Extensão em Tecnologia Social",
    description: "Desenvolvimento de soluções tecnológicas para comunidades carentes, aplicando conhecimentos de programação e gestão de projetos.",
    hours: 40,
    category: "Tecnologia",
    participants: 15,
    status: "Disponível",
  },
  {
    id: 2,
    title: "Oficinas de Programação para Jovens",
    description: "Ensino de lógica de programação e desenvolvimento web para estudantes do ensino médio.",
    hours: 30,
    category: "Educação",
    participants: 8,
    status: "Disponível",
  },
  {
    id: 3,
    title: "Pesquisa em Inteligência Artificial",
    description: "Projeto de pesquisa focado em aplicações de IA para resolução de problemas reais da sociedade.",
    hours: 60,
    category: "Pesquisa",
    participants: 20,
    status: "Inscrições Abertas",
  },
  {
    id: 4,
    title: "Consultoria em Transformação Digital",
    description: "Assessoria a pequenas empresas na implementação de processos digitais e ferramentas de gestão.",
    hours: 50,
    category: "Consultoria",
    participants: 12,
    status: "Disponível",
  },
]

export default function HomePage() {
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
                <Link href="/" className="text-sm font-medium text-foreground hover:text-primary">
                  Atividades
                </Link>
                <Link href="/progress" className="text-sm font-medium text-muted-foreground hover:text-foreground">
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

      {/* Hero Section */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-balance">
              Compartilhe conhecimento e transforme vidas através da extensão
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Uma plataforma colaborativa para documentar projetos acadêmicos, inspirar futuros alunos e fortalecer a comunidade universitária.
            </p>
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar atividades..." 
                  className="pl-9"
                />
              </div>
              <Button>Explorar</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-muted-foreground">Atividades disponíveis</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <div className="text-2xl font-bold">342</div>
                <div className="text-sm text-muted-foreground">Estudantes participando</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-chart-4/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <div className="text-2xl font-bold">1,240</div>
                <div className="text-sm text-muted-foreground">Horas de extensão registradas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Atividades de Extensão</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Todas
            </Button>
            <Button variant="ghost" size="sm">
              Tecnologia
            </Button>
            <Button variant="ghost" size="sm">
              Educação
            </Button>
            <Button variant="ghost" size="sm">
              Pesquisa
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {activities.map((activity) => (
            <Card key={activity.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary">{activity.category}</Badge>
                  <Badge variant="outline">{activity.status}</Badge>
                </div>
                <CardTitle className="text-xl mb-2">{activity.title}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {activity.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{activity.hours}h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{activity.participants} vagas</span>
                  </div>
                </div>
                <Button asChild>
                  <Link href={`/activity/${activity.id}`}>Ver detalhes</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
