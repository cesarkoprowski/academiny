"use client"

import { useState } from "react"
import { Upload, LinkIcon, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DocumentUploadDialogProps {
  activityId: number
  activityTitle: string
  trigger?: React.ReactNode
}

export function DocumentUploadDialog({ 
  activityId, 
  activityTitle,
  trigger 
}: DocumentUploadDialogProps) {
  const [open, setOpen] = useState(false)
  const [documentLink, setDocumentLink] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting:", { activityId, documentLink, notes })
    setOpen(false)
    setDocumentLink("")
    setNotes("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Enviar Comprovação
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Enviar Comprovação</DialogTitle>
            <DialogDescription>
              Faça o upload dos documentos para validação da carga horária
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="activity-name">Atividade</Label>
              <Input 
                id="activity-name"
                value={activityTitle}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doc-link">Link dos Documentos *</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="doc-link"
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={documentLink}
                  onChange={(e) => setDocumentLink(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Use Google Drive, Dropbox ou outro serviço de nuvem
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doc-notes">Observações</Label>
              <Textarea 
                id="doc-notes"
                placeholder="Informações adicionais..."
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="p-3 rounded-lg bg-muted/50 text-xs space-y-1">
              <div className="font-medium">Documentos necessários:</div>
              <ul className="space-y-0.5 ml-4 list-disc text-muted-foreground">
                <li>Ficha de frequência assinada</li>
                <li>Relatório de atividades</li>
                <li>Evidências (fotos, certificados)</li>
                <li>Formulário de autoavaliação</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!documentLink}>
              <Upload className="h-4 w-4 mr-2" />
              Enviar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
