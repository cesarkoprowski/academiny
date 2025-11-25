"use client";

import { OTPInput, type SlotProps } from "input-otp";
import { useId } from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export default function Component() {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <div className="flex justify-center">
        <OTPInput
          containerClassName="flex items-center gap-3 has-disabled:opacity-50"
          id={id}
          maxLength={6}
          render={({ slots }) => (
            <div className="flex gap-2">
              {slots.map((slot, idx) => (
                <Slot key={String(idx)} {...slot} />
              ))}
            </div>
          )}
        />
      </div>
    </div>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "flex size-15 items-center justify-center rounded-md border border-input bg-background font-medium text-xl text-foreground shadow-xs transition-[color,box-shadow]",
        { "z-10 border-ring ring-[3px] ring-ring/50": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
