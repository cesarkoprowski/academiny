import {
  BookOpen,
  Lightbulb,
  Users,
  TrendingUp,
  Award,
  Search,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Portfólio Acadêmico",
    description:
      "Organize e documente todos os seus projetos de extensão em um único lugar profissional.",
    color: "text-[#7dd3c0]",
    bgColor: "bg-[#7dd3c0]/10",
  },
  {
    icon: Lightbulb,
    title: "Desafios Reais",
    description:
      "Acesse demandas de empresas, ONGs e comunidades que precisam de soluções inovadoras.",
    color: "text-[#e89b3c]",
    bgColor: "bg-[#e89b3c]/10",
  },
  {
    icon: Users,
    title: "Colaboração",
    description:
      "Conecte-se com outros estudantes, forme equipes e trabalhe em projetos colaborativos.",
    color: "text-[#7dd3c0]",
    bgColor: "bg-[#7dd3c0]/10",
  },
  {
    icon: TrendingUp,
    title: "Visibilidade",
    description:
      "Ganhe reconhecimento e destaque seus projetos para potenciais empregadores e parceiros.",
    color: "text-[#e89b3c]",
    bgColor: "bg-[#e89b3c]/10",
  },
  {
    icon: Award,
    title: "Extensão Universitária",
    description:
      "Alinhado com a lei de projetos de extensão, valorizando sua produção acadêmica.",
    color: "text-[#7dd3c0]",
    bgColor: "bg-[#7dd3c0]/10",
  },
  {
    icon: Search,
    title: "Integrabilidade",
    description:
      "Sua universidade pode integrar o sistema do Academiny a qualquer momento para uso interno.",
    color: "text-[#e89b3c]",
    bgColor: "bg-[#e89b3c]/10",
  },
];

export function FeaturesSection() {
  return (
    <section id="recursos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
            Tudo que você precisa para impactar
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Uma plataforma completa para conectar conhecimento acadêmico com
            necessidades reais da sociedade
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md">
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-[#1e3a5f] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
