"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NumberStepper from "@/components/number-stepper";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { createActivity } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import Link from "next/link";

export default function NewActivityPage() {
  const [learningObjectives, setLearningObjectives] = useState<string[]>([]);
  const [currentObjective, setCurrentObjective] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    cargaHoraria: "",
    category: "",
    capacity: "",
    status: "ativa",
    about: "",
    coordinator: "",
    email: "",
  });

  const { token } = useAuth();
  const router = useRouter();

  const addObjective = () => {
    if (currentObjective.trim()) {
      setLearningObjectives([...learningObjectives, currentObjective]);
      setCurrentObjective("");
    }
  };

  const removeObjective = (index: number) => {
    setLearningObjectives(learningObjectives.filter((_, i) => i !== index));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError(
        "Você precisa estar logado como coordenador para criar atividades"
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await createActivity(
        {
          titulo: formData.titulo,
          descricao: formData.descricao,
          cargaHoraria: parseInt(formData.cargaHoraria),
        },
        token
      );

      console.log("[v0] Activity created successfully");
      setSuccess(true);

      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch (err) {
      console.error("[v0] Error creating activity:", err);
      setError(
        "Erro ao criar atividade. Verifique suas permissões e tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
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
            <h1 className="text-3xl font-bold mb-2">
              Cadastrar nova atividade
            </h1>
            <p className="text-muted-foreground">
              Preencha as informações para criar uma nova atividade de extensão
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Dados da atividade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título da atividade *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Projeto de Extensão em Tecnologia Social"
                    value={formData.titulo}
                    onChange={(e) => handleChange("titulo", e.target.value)}
                    required
                    disabled={isLoading || success}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva a atividade de forma clara e objetiva..."
                    rows={4}
                    value={formData.descricao}
                    onChange={(e) => handleChange("descricao", e.target.value)}
                    required
                    disabled={isLoading || success}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleChange("category", value)}
                      disabled={isLoading || success}
                    >
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
                      value={formData.cargaHoraria}
                      onChange={(e) =>
                        handleChange("cargaHoraria", e.target.value)
                      }
                      required
                      disabled={isLoading || success}
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
                      value={formData.capacity}
                      onChange={(e) => handleChange("capacity", e.target.value)}
                      required
                      disabled={isLoading || success}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status *</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleChange("status", value)}
                      disabled={isLoading || success}
                    >
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativa">Ativa</SelectItem>
                        <SelectItem value="inscricoes">
                          Inscrições Abertas
                        </SelectItem>
                        <SelectItem value="inativa">Inativa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>

              <Separator />

              <CardHeader>
                <CardTitle>Informações complementares</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="about">Sobre a atividade</Label>
                  <Textarea
                    id="about"
                    placeholder="Informações adicionais sobre a atividade, contexto, metodologia..."
                    rows={5}
                    value={formData.about}
                    onChange={(e) => handleChange("about", e.target.value)}
                    disabled={isLoading || success}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Objetivos</Label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      placeholder="Digite um objetivo de aprendizagem..."
                      value={currentObjective}
                      onChange={(e) => setCurrentObjective(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addObjective();
                        }
                      }}
                      disabled={isLoading || success}
                    />
                    <Button
                      type="button"
                      onClick={addObjective}
                      disabled={isLoading || success}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {learningObjectives.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {learningObjectives.map((objective, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 rounded-lg bg-muted"
                        >
                          <span className="flex-1 text-sm">{objective}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeObjective(index)}
                            disabled={isLoading || success}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>

              <Separator />

              <CardHeader>
                <CardTitle>Orientação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="coordinator">Nome do Coordenador *</Label>
                  <Input
                    id="coordinator"
                    placeholder="Prof. Dr. João Silva"
                    value={formData.coordinator}
                    onChange={(e) =>
                      handleChange("coordinator", e.target.value)
                    }
                    required
                    disabled={isLoading || success}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email de Contato *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="coordenador@universidade.edu.br"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    disabled={isLoading || success}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1"
                disabled={isLoading || success}
              >
                Cadastrar Atividade
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
