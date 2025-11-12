import { UserPlus, FolderPlus, Rocket, Trophy } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Crie sua Conta",
    description: "Cadastre-se gratuitamente e configure seu perfil em minutos.",
  },
  {
    icon: Rocket,
    number: "02",
    title: "Explore Desafios",
    description:
      "Navegue por demandas reais de comunidades e organizações que precisam de soluções.",
  },
  {
    icon: FolderPlus,
    number: "03",
    title: "Adicione Projetos",
    description:
      "Documente seus projetos universitários com descrições, imagens e resultados.",
  },
  {
    icon: Trophy,
    number: "04",
    title: "Cause Impacto",
    description:
      "Aplique seu conhecimento, construa seu portfólio e faça a diferença no mundo real.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
            Como funciona o Academiny
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quatro passos simples para transformar seus projetos acadêmicos em
            impacto real
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-[#7dd3c0] to-[#6bc4b1] flex items-center justify-center shadow-lg">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#e89b3c] flex items-center justify-center text-white font-bold text-sm">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#1e3a5f] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-linear-to-r from-[#7dd3c0] to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
