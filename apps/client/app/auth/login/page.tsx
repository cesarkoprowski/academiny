"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !senha) {
      toast.warning("Campos obrigatórios", {
        description: "Por favor, preencha todos os campos do formulário.",
      });
      setIsLoading(false);
      return;
    }

    try {
      await login(email, senha);
      toast.success("Login realizado com sucesso");
      router.push("/atividades");
    } catch (err: unknown) {
      let errorMessage = "Ocorreu um erro. Tente novamente";

      if (err instanceof Error) {
        errorMessage = err.message;

        if (errorMessage.includes("strong")) {
          errorMessage = "A senha inserida não corresponde a um usuário válido";
        }
      }

      toast.error("Falha na autenticação", {
        description: errorMessage,
      });
      console.error("[v0] Login failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/academiny-logo.png"
              alt="Academiny"
              width={200}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </div>
          <CardDescription>
            Entre com suas credenciais para acessar a plataforma
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} noValidate>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={isVisible ? "text" : "password"}
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute cursor-pointer inset-y-0 end-0 flex w-9 items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  {isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-2">
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isLoading}
            >
              Entrar
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Não tem uma conta?{" "}
              <Link
                href="/auth/cadastro"
                className="text-primary hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
            <p className="text-sm text-center text-muted-foreground">
              <Link
                href="/auth/recuperar-senha"
                className="text-primary hover:underline"
              >
                Esqueci minha senha
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
