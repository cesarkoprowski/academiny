"use client";

import { useId, useMemo, useState } from "react";
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  name?: string;
  id?: string;
  onChange?: (value: string) => void;
  value?: string;
}

export function PasswordInput({
  label = "Password",
  placeholder = "Enter your password",
  name = "password",
  id,
  value,
  onChange,
}: PasswordInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  const [isVisible, setIsVisible] = useState(false);

  const password = value ?? "";
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "No mínimo 8 caracteres" },
      { regex: /[0-9]/, text: "Pelo menos um número" },
      { regex: /[a-z]/, text: "Pelo menos uma letra minúscula" },
      { regex: /[A-Z]/, text: "Pelo menos uma letra maiúscula" },
      { regex: /[^A-Za-z0-9]/, text: "Pelo menos um caractere especial" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score <= 3) return "bg-amber-500";
    if (score === 4) return "bg-lime-500";
    return "bg-emerald-500";
  };

  return (
    <div>
      <Label className="flex pb-1.25" htmlFor={inputId}>{label}</Label>

      <div className="relative">
        <Input
          id={inputId}
          name={name}
          className="pe-9"
          placeholder={placeholder}
          type={isVisible ? "text" : "password"}
          value={password}
          onChange={(e) => onChange?.(e.target.value)}
        />

        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute cursor-pointer inset-y-0 end-0 flex w-9 items-center justify-center text-muted-foreground hover:text-foreground"
        >
          {isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
        </button>
      </div>

      <div className="mt-3 mb-4 h-1 rounded-full bg-border">
        <div
          className={`h-full ${getStrengthColor(strengthScore)} transition-all`}
          style={{ width: `${(strengthScore / 5) * 100}%` }}
        ></div>
      </div>

      <ul className="mt-2 space-y-1.5">
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <CheckIcon size={16} className="text-emerald-500" />
            ) : (
              <XIcon size={16} className="text-muted-foreground" />
            )}
            <span
              className={`text-xs ${
                req.met ? "text-emerald-600" : "text-muted-foreground"
              }`}
            >
              {req.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
