"use client";

import { useState } from "react";
import { forgotPassword, resetPassword } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordInput } from "@/components/strength-password";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import OTPInput from "@/components/otp-input";
import { EyeOffIcon, EyeIcon } from "lucide-react";

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [senha, setSenha] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitForgot = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      toast.warning("Campos obrigatórios", {
        description: "Por favor, preencha todos os campos do formulário.",
      });
      return;
    }

    setIsLoading(true);

    try {
      await forgotPassword({
        email: formData.email,
      });

      toast.success("Email enviado", {
        description:
          "Um link para recuperação da senha foi enviado no seu email",
      });

      setSuccess(true);
    } catch (err: unknown) {
      let errorMessage = "Ocorreu um erro ao enviar o email de recuperação";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      toast.error("Falha no envio", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      toast.warning("Campos obrigatórios", {
        description: "Por favor, preencha todos os campos do formulário.",
      });
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword({
        email: formData.email,
        code: formData.code,
        newPassword: formData.newPassword,
      });

      toast.success("Email enviado", {
        description:
          "Um link para recuperação da senha foi enviado no seu email",
      });

      setSuccess(true);
    } catch (err: unknown) {
      let errorMessage = "Ocorreu um erro ao enviar o email de recuperação";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      toast.error("Falha no envio", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Se sucesso = true, mostra o card de sucesso */}
      {success ? (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-2">
            <CardTitle>Recuperação de senha</CardTitle>
            <CardDescription>
              Insira o código enviado para o seu email abaixo{" "}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmitReset}>
            <CardContent className="text-center">
              <OTPInput
                value={formData.code}
                onChange={(v) => setFormData((p) => ({ ...p, code: v }))}
              />
              <div className="pt-4 space-y-2">
                <PasswordInput
                  label="Nova senha"
                  placeholder="••••••••"
                  name="senha"
                  value={formData.newPassword}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, newPassword: v }))
                  }
                />
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-center">
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isLoading}
              >
                Alterar senha
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
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
              Informe o seu endereço de email para prosseguir
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmitForgot} noValidate>
            <CardContent className="space-y-4">
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
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pt-2">
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isLoading}
              >
                Enviar link
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
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
}
