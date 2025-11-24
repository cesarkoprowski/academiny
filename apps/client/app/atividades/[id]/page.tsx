import { ArrowLeft, Clock, Users, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DocumentUploadDialog } from "@/components/document-upload-dialog";
import { SelfEvaluationDialog } from "@/components/self-evaluation-dialog";
import Link from "next/link";

export default function ActivityDetailsPage() {
  const activity = {
    id: 1,
    title: "Oficinas de programação para jovens",
    hours: 40,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para atividades
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary">Tecnologia</Badge>
                <Badge variant="outline">Inscrições Abertas</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-4 text-balance">
                {activity.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Desenvolvimento de soluções tecnológicas para comunidades
                carentes, aplicando conhecimentos de programação e gestão de
                projetos.
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-semibold mb-4">Sobre a Atividade</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Este projeto visa aproximar estudantes de tecnologia das
                  necessidades reais de comunidades em situação de
                  vulnerabilidade social. Através de uma abordagem colaborativa,
                  os participantes desenvolverão aplicações e sistemas que
                  atendam demandas específicas identificadas junto aos
                  beneficiários.
                </p>
                <p>
                  Durante o projeto, você terá a oportunidade de aplicar
                  conhecimentos técnicos em situações reais, desenvolver
                  habilidades de trabalho em equipe e comunicação, além de
                  contribuir para a transformação social através da tecnologia.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">
                Objetivos de Aprendizagem
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Desenvolver soluções tecnológicas alinhadas com necessidades
                    sociais reais
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Aplicar metodologias ágeis no desenvolvimento de projetos
                    sociais
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Fortalecer competências de trabalho colaborativo e
                    interdisciplinar
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Compreender o impacto social da tecnologia na vida das
                    pessoas
                  </span>
                </li>
              </ul>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Documentos da Atividade</CardTitle>
                <CardDescription>
                  Baixe os materiais necessários para participar da atividade
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Ficha de Frequência
                  </span>
                  <span className="text-xs text-muted-foreground">
                    PDF, 120KB
                  </span>
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Manual da Atividade
                  </span>
                  <span className="text-xs text-muted-foreground">
                    PDF, 850KB
                  </span>
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Formulário de Autoavaliação
                  </span>
                  <span className="text-xs text-muted-foreground">
                    PDF, 95KB
                  </span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Carga Horária</div>
                    <div className="text-sm text-muted-foreground">
                      {activity.hours} horas
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Vagas Disponíveis</div>
                    <div className="text-sm text-muted-foreground">
                      15 vagas
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="font-medium mb-2">Responsável</div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary" />
                    <div>
                      <div className="text-sm font-medium">
                        Prof. Dr. João Silva
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Coordenador
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button size="lg" className="w-full">
              Inscrever-se na Atividade
            </Button>

            {/* <CHANGE> Added document upload and self-evaluation dialogs */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-base">Após Conclusão</CardTitle>
                <CardDescription>
                  Envie seus documentos e autoavaliação
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <DocumentUploadDialog
                  activityTitle={activity.title}
                  activityHours={activity.hours}
                />
                <SelfEvaluationDialog activityTitle={activity.title} />
                <p className="text-xs text-muted-foreground">
                  Disponível após conclusão da atividade
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
