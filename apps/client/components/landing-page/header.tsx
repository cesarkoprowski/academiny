import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img
                src="/academiny-logo.png"
                alt="Academiny"
                width={140}
                height={35}
                className="h-8 w-auto"
              />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="bg-[#7dd3c0] hover:bg-[#6bcab5]"
              size="lg"
              asChild
            >
              <Link href="/auth/login">Entrar</Link>
            </Button>{" "}
            <Button variant={"outline"} size="lg" asChild>
              <Link href="/auth/cadastro">Registrar</Link>
            </Button>{" "}
          </div>
        </div>
      </div>
    </nav>
  );
}
