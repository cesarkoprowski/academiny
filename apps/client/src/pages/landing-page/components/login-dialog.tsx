import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginDialogProps {
  btnLabel: string;
}

export default function LoginDialog({ btnLabel }: LoginDialogProps) {
  const id = useId();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="cursor-pointer">
          {btnLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <DialogHeader>
            <img
              src="/logo.png"
              alt="Academiny"
              width={160}
              height={40}
              className="h-10 w-auto"
            />{" "}
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input id={`${id}-email`} type="email" required />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-password`}>Senha</Label>
              <Input id={`${id}-password`} type="password" required />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id={`${id}-remember`} className="cursor-pointer" />
              <Label
                htmlFor={`${id}-remember`}
                className="font-normal text-muted-foreground"
              >
                Lembrar-me
              </Label>
            </div>
            <a className="text-sm underline hover:no-underline" href="#">
              Esqueceu a senha?
            </a>
          </div>
          <Button
            type="button"
            className="cursor-pointer w-full bg-[#7dd3c0] hover:bg-[#6bc4b1]"
          >
            Entrar
          </Button>
        </form>

        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          <span className="text-xs text-muted-foreground">Ou continue com</span>
        </div>

        <div className="text-sm text-center text-muted-foreground">
          Não tem uma conta?{" "}
          <a className="text-[#7dd3c0] hover:text-[#6bc4b1] font-medium transition-colors cursor-pointer">
            Cadastre-se gratuitamente
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
