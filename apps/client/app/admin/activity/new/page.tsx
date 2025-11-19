"use client"

import { useState } from "react"
import { ArrowLeft, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function NewActivityPage() {
  const [learningObjectives, setLearningObjectives] = useState<string[]>([])
  const [currentObjective, setCurrentObjective] = useState("")

  const addObjective = () => {
    if (currentObjective.trim()) {
      setLearningObjectives([...learningObjectives, currentObjective])
      setCurrentObjective("")
    }
  }

  const removeObjective = (index: number) => {
    setLearningObjectives(learningObjectives.filter((_, i) => i !== index))
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
              <Badge variant="secondary">Nova Atividade</Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin">Cancelar</Link>
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
            Voltar para o painel
          </Link>
        </Button>

        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Cadastrar Nova Atividade</h1>
            <p className="text-muted-foreground">
              Preencha as informações para criar uma nova atividade de extensão
            </p>
          </div>

          <form className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>
                  Dados principais da atividade
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Atividade *</Label>
                  <Input 
                    id="title"
                    placeholder="Ex: Projeto de Extensão em Tecnologia Social"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea 
                    id="description"
                    placeholder="Descreva a atividade de forma clara e objetiva..."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria *</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="educacao">Educação</SelectItem>
                        <SelectItem value="pesquisa">Pesquisa</SelectItem>
                        <SelectItem value="consultoria">Consultoria</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hours">Carga Horária (horas) *</Label>
                    <Input 
                      id="hours"
                      type="number"
                      placeholder="40"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Número de Vagas *</Label>
                    <Input 
                      id="capacity"
                      type="number"
                      placeholder="20"
                      min="1"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status *</Label>
                    <Select defaultValue="ativa">
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativa">Ativa</SelectItem>
                        <SelectItem value="inscricoes">Inscrições Abertas</SelectItem>
                        <SelectItem value="inativa">Inativa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Detalhadas</CardTitle>
                <CardDescription>
                  Objetivos e requisitos da atividade
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="about">Sobre a Atividade</Label>
                  <Textarea 
                    id="about"
                    placeholder="Informações adicionais sobre a atividade, contexto, metodologia..."
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Objetivos de Aprendizagem</Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Digite um objetivo de aprendizagem..."
                      value={currentObjective}
                      onChange={(e) => setCurrentObjective(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addObjective()
                        }
                      }}
                    />
                    <Button type="button" onClick={addObjective}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {learningObjectives.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {learningObjectives.map((objective, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                          <span className="flex-1 text-sm">{objective}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeObjective(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Coordinator */}
            <Card>
              <CardHeader>
                <CardTitle>Coordenação</CardTitle>
                <CardDescription>
                  Responsável pela atividade
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="coordinator">Nome do Coordenador *</Label>
                  <Input 
                    id="coordinator"
                    placeholder="Prof. Dr. João Silva"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email de Contato *</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="coordenador@universidade.edu.br"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" className="flex-1" asChild>
                <Link href="/admin">Cancelar</Link>
              </Button>
              <Button type="submit" className="flex-1">
                Cadastrar Atividade
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
