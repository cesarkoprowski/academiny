import { Button } from "@/components/ui/button";
import { ArrowRight, Building2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#1e3a5f] via-[#2a4a6f] to-[#1e3a5f]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Conecte seus projetos de extensão ao{" "}
              <span className="text-[#7dd3c0]">mundo real</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
              O Academiny é o ecossistema integrativo que transforma a produção
              universitária de projetos de extensão muito mais prática e
              intuitiva.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 cursor-pointer">
              <Button
                size="lg"
                asChild
                className="bg-[#7dd3c0] hover:bg-[#6bc4b1] text-[#1e3a5f] font-semibold"
              >
                <a href="/cadastro">
                  Começar
                  <ArrowRight className="ml-1 w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-linear-to-br from-[#7dd3c0]/20 to-[#e89b3c]/20 backdrop-blur-sm border border-white/10 p-8">
              <div className="absolute inset-0 bg-[url('/hero-image.png')] bg-cover bg-center opacity-80" />
              <div className="relative z-10 h-full flex flex-col justify-end">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#7dd3c0] flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#1e3a5f]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#1e3a5f]">
                        Aperfeiçoamento em Gestão para pequenos empreendedores
                      </div>
                      <div className="text-sm text-gray-600">
                        Cursos e Oficinas
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#7dd3c0]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#e89b3c]/10 rounded-full blur-3xl" />
    </section>
  );
}
