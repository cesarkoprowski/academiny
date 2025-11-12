import { useParams, useNavigate } from "react-router-dom";
import { DashboardNav } from "@/components/dashboard-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Users, Calendar } from "lucide-react";

const activities = [
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

export default function ActivityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const activity = activities.find((a) => a.id === Number(id));

  if (!activity) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <p className="text-xl text-gray-600 mb-4">
          Atividade não encontrada...
        </p>
        <Button onClick={() => navigate("/activities")}>Voltar</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1e3a5f] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    variant="outline"
                    className="border-[#7dd3c0] text-[#7dd3c0]"
                  >
                    {activity.type}
                  </Badge>
                  <Badge variant="secondary">{activity.category}</Badge>
                </div>

                <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2">
                  {activity.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {activity.postedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {activity.applicants} candidatos
                  </span>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {activity.description}
                </p>
                <Separator className="my-4" />
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Carga horária: {activity.deadline}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
