"use client";

import { useEffect, useState } from "react";
import { Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { getAllActivities } from "@/lib/api";

export default function HomePage() {
  const { token, isAuthenticated } = useAuth();
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchActivities = async () => {
      if (!token || !isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getAllActivities(token);
        console.log("[v0] Activities fetched:", data);
        setActivities(data);
      } catch (error) {
        console.error("[v0] Error fetching activities:", error);
        setActivities([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, [token, isAuthenticated]);

  const filteredActivities = activities.filter(
    (activity) =>
      activity.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Activities Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Atividades</h1>
          <p className="text-muted-foreground mb-6">
            Explore e participe das atividades de extensão disponíveis
          </p>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar atividades..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando atividades...</p>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {activities.length === 0
                ? "Nenhuma atividade disponível no momento."
                : "Nenhuma atividade encontrada com os filtros aplicados."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredActivities.map((activity) => (
              <Card
                key={activity.id}
                className="hover:shadow-lg transition-shadow flex flex-col h-full"
              >
                <CardHeader className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">Extensão</Badge>
                    <Badge variant="outline">Disponível</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">
                    {activity.titulo}
                  </CardTitle>
                  <CardDescription
                    className="leading-relaxed line-clamp-3"
                    title={activity.descricao}
                  >
                    {activity.descricao}
                  </CardDescription>
                </CardHeader>

                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{activity.cargaHoraria || 0}h</span>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/activity/${activity.id}`}>Acessar</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
