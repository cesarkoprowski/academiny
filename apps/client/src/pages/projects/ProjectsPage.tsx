import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Filter, Users, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "Inclusão digital de idosos",
    description:
      "Buscamos uma solução tecnológica para auxiliar pessoas idosas a utilizar celulares, notebooks, desktops e outros periféricos.",
    organization: "Prof. Alexandre Ferraz",
    type: "Projeto Social",
    category: "Análise e Desenvolvimento de Sistemas",
    deadline: "20 horas",
    applicants: 12,
    postedAt: "há 3 dias",
  },
];

export default function ActivitiesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2">
              Projetos
            </h1>
            <p className="text-gray-600">
              Visualize os projetos de extensão que você esta envolvido
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar por atividades..." className="pl-10" />
          </div>
          <Button variant="outline" className="cursor-pointer">
            <Filter className="w-4 h-4" />
            Filtrar
          </Button>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <Card
              key={project.id}
              onClick={() => navigate(`/atividades/${project.id}`)}
              className="hover:shadow-md transition-shadow cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className={
                          project.type === "Empresa"
                            ? "border-[#7dd3c0] text-[#7dd3c0]"
                            : "border-[#e89b3c] text-[#e89b3c]"
                        }
                      >
                        {project.type}
                      </Badge>
                      <Badge variant="secondary">{project.category}</Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">
                      <a
                        href={`/projetos/${project.id}`}
                        className="hover:text-[#7dd3c0] transition-colors"
                      >
                        {project.title}
                      </a>
                    </CardTitle>
                    <CardDescription className="text-sm mb-3">
                      {project.organization}
                    </CardDescription>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Carga: {project.deadline}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {project.applicants} candidatos
                      </span>
                      <span className="text-gray-500">{project.postedAt}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
