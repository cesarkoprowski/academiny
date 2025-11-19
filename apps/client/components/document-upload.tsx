"use client"

import { useState } from "react"
import { Upload, LinkIcon, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { createProject } from "@/lib/api"
import { useAuth } from "@/lib/auth"

interface DocumentUploadProps {
  activityId: number
  activityTitle: string
}

export function DocumentUpload({ activityId, activityTitle }: DocumentUploadProps) {
  const [documentLink, setDocumentLink] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  const { token } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!token) {
      setError("Você precisa estar logado para enviar comprovações")
      return
    }
    
    setIsLoading(true)
    setError("")
    
    try {
      await createProject({
        nome: activityTitle,
        atividadeExtensaoId: activityId,
        professorAvaliadorId: 1, // This should come from the activity data
        resumo: notes || "Comprovação de atividade",
        urlAnexo: documentLink,
      }, token)
      
      console.log("[v0] Project created successfully")
      setIsSubmitted(true)
    } catch (err) {
      console.error("[v0] Error submitting project:", err)
      setError("Erro ao enviar comprovação. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <FileText className="h-5 w-5" />
            Submissão Enviada
          </CardTitle>
          <CardDescription>
            Sua comprovação foi enviada com sucesso e está aguardando análise
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 rounded-lg bg-background">
            <div className="text-sm font-medium mb-1">Link enviado:</div>
            <a 
              href={documentLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline break-all"
            >
              {documentLink}
            </a>
          </div>
          {notes && (
            <div className="p-3 rounded-lg bg-background">
              <div className="text-sm font-medium mb-1">Observações:</div>
              <p className="text-sm text-muted-foreground">{notes}</p>
            </div>
          )}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsSubmitted(false)}
          >
            Editar Submissão
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enviar Comprovação de Atividade</CardTitle>
        <CardDescription>
          Faça o upload dos seus documentos para validação da carga horária
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="activity">Atividade</Label>
            <Input 
              id="activity" 
              value={activityTitle}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Link dos Documentos *</Label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                id="link"
                type="url"
                placeholder="https://drive.google.com/..."
                value={documentLink}
                onChange={(e) => setDocumentLink(e.target.value)}
                className="pl-9"
                required
                disabled={isLoading}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Use Google Drive, Dropbox ou outro serviço de armazenamento em nuvem
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações (opcional)</Label>
            <Textarea 
              id="notes"
              placeholder="Adicione informações relevantes sobre sua participação..."
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="p-4 rounded-lg bg-muted/50 text-sm space-y-2">
            <div className="font-medium">Documentos necessários:</div>
            <ul className="space-y-1 ml-4 list-disc text-muted-foreground">
              <li>Ficha de frequência preenchida e assinada</li>
              <li>Relatório detalhado das atividades realizadas</li>
              <li>Evidências (fotos, certificados, etc.)</li>
              <li>Formulário de autoavaliação preenchido</li>
            </ul>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={!documentLink || isLoading}>
            <Upload className="h-4 w-4 mr-2" />
            {isLoading ? 'Enviando...' : 'Enviar Comprovação'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
