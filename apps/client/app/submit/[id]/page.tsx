import { ArrowLeft, Download, Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DocumentUpload } from "@/components/document-upload"
import Link from "next/link"

export default function SubmitDocumentsPage() {
  const activity = {
    id: 1,
    title: "Projeto de Extensão em Tecnologia Social",
    hours: 40,
    category: "Tecnologia",
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
            </div>
            <div className="flex items-center gap-3">
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
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/progress">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para meu progresso
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="secondary">{activity.category}</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2 text-balance">
                {activity.title}
              </h1>
              <p className="text-muted-foreground">
                Complete sua submissão anexando os documentos comprobatórios
              </p>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Prazo de Análise</AlertTitle>
              <AlertDescription>
                Após o envio, sua submissão será analisada em até 7 dias úteis. 
                Você receberá uma notificação com o resultado da análise.
              </AlertDescription>
            </Alert>

            <DocumentUpload 
              activityId={activity.id}
              activityTitle={activity.title}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Atividade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Carga horária</span>
                  <span className="font-medium">{activity.hours}h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Categoria</span>
                  <span className="font-medium">{activity.category}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Documentos para Download</CardTitle>
                <CardDescription>
                  Baixe os formulários necessários
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-between">
                  <span>Ficha de Frequência</span>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-between">
                  <span>Formulário de Autoavaliação</span>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-between">
                  <span>Template de Relatório</span>
                  <Download className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-base">Precisa de Ajuda?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Se tiver dúvidas sobre o processo de submissão, entre em contato 
                  com o coordenador da atividade.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Contatar Coordenador
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
