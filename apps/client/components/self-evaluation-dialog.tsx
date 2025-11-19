"use client"

import { useState } from "react"
import { FileText, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
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

interface SelfEvaluationDialogProps {
  activityId: number
  activityTitle: string
  trigger?: React.ReactNode
}

export function SelfEvaluationDialog({ 
  activityId, 
  activityTitle,
  trigger 
}: SelfEvaluationDialogProps) {
  const [open, setOpen] = useState(false)
  const [evaluation, setEvaluation] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting evaluation:", { activityId, evaluation })
    setOpen(false)
    setEvaluation("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Autoavaliação
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Autoavaliação da Atividade</DialogTitle>
            <DialogDescription>
              Reflita sobre sua experiência e aprendizados durante a atividade
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="activity-eval">Atividade</Label>
              <div className="p-2 rounded-lg bg-muted text-sm">
                {activityTitle}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="evaluation-text">Sua Avaliação *</Label>
              <Textarea 
                id="evaluation-text"
                placeholder="Descreva sua experiência, desafios enfrentados, aprendizados obtidos e como a atividade contribuiu para seu desenvolvimento..."
                rows={8}
                value={evaluation}
                onChange={(e) => setEvaluation(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Mínimo 200 caracteres ({evaluation.length}/200)
              </p>
            </div>

            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-xs space-y-2">
              <div className="font-medium">Sugestões de pontos para abordar:</div>
              <ul className="space-y-1 ml-4 list-disc text-muted-foreground">
                <li>O que você aprendeu durante a atividade?</li>
                <li>Quais foram os principais desafios?</li>
                <li>Como você aplicou seus conhecimentos acadêmicos?</li>
                <li>Qual foi o impacto da sua participação?</li>
                <li>O que você faria diferente?</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={evaluation.length < 200}>
              <Send className="h-4 w-4 mr-2" />
              Enviar Autoavaliação
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
