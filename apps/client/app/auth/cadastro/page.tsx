"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";
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
import { PasswordInput } from "@/components/strength-password";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [success] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/\D/g, "");

    value = value
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.cpf || !formData.senha) {
      toast.warning("Campos obrigatórios", {
        description: "Por favor, preencha todos os campos do formulário.",
      });
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      toast.error("Erro de senha", {
        description: "As senhas não coincidem.",
      });
      return;
    }

    setIsLoading(true);

    try {
      await registerUser({
        nome: formData.nome,
        cpf: formData.cpf,
        email: formData.email,
        senha: formData.senha,
      });

      toast.success("Cadastro realizado com sucesso", {
        description: "Efetue o login para entrar na sua conta",
      });
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err: unknown) {
      let errorMessage = "Ocorreu um erro. Tente novamente";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      toast.error("Falha no cadastro", {
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
            Preencha os dados abaixo para criar sua conta no Academiny
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} noValidate>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                name="nome"
                type="text"
                placeholder="Insira o seu nome"
                value={formData.nome}
                onChange={handleChange}
                required
                disabled={isLoading || success}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                name="cpf"
                maxLength={14}
                type="text"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={handleCpfChange}
                required
                disabled={isLoading || success}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading || success}
              />
            </div>

            <div className="space-y-2">
              <PasswordInput
                label="Senha"
                placeholder="••••••••"
                name="senha"
                value={formData.senha}
                onChange={(v) => setFormData((p) => ({ ...p, senha: v }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmarSenha">Confirmação de senha</Label>
              <div className="relative">
                <Input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  placeholder="••••••••"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required
                  type={isVisible ? "text" : "password"}
                  disabled={isLoading || success}
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
              disabled={isLoading || success}
            >
              Cadastrar-se
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Já tem uma conta?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Faça login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
