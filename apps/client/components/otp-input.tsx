import { OTPInput as BaseOTPInput, type SlotProps } from "input-otp";
import { useId } from "react";
import { cn } from "@/lib/utils";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
}

export default function OTPInput({ value, onChange, maxLength = 6 }: Props) {
  const id = useId();

  return (
    <div className="*:not-first:mt-2">
      <div className="flex justify-center">
        <BaseOTPInput
          id={id}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          containerClassName="flex items-center gap-3 has-disabled:opacity-50"
          render={({ slots }) => (
            <div className="flex gap-2">
              {slots.map((slot, idx) => (
                <Slot key={idx} {...slot} />
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
      {props.char && <div>{props.char}</div>}
    </div>
  );
}
