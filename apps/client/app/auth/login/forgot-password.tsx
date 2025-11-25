"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ForgotPasswordDialog({ open, onOpenChange }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    setLoading(true);

    try {
      // sua lógica real aqui
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Recuperar senha</DialogTitle>
          <DialogDescription>
            Enviaremos um link de recuperação para seu email.
          </DialogDescription>
        </DialogHeader>

        {!sent ? (
          <div className="space-y-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="voce@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
        ) : (
          <Alert>
            <AlertDescription>
              Se houver uma conta com esse email, enviamos um link para
              recuperação.
            </AlertDescription>
          </Alert>
        )}

        <DialogFooter>
          {!sent ? (
            <Button onClick={handleSend} disabled={loading}>
              {loading ? "Enviando..." : "Enviar link"}
            </Button>
          ) : (
            <Button onClick={() => onOpenChange(false)}>Fechar</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
