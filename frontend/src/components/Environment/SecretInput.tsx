import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { cn } from "#/lib/utils";

type SecretInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
  autoFocus?: boolean;
  className?: string;
  wrapperClassName?: string;
  "aria-label": string;
};

export function SecretInput({
  value,
  onChange,
  placeholder,
  invalid = false,
  autoFocus,
  className,
  wrapperClassName,
  "aria-label": ariaLabel,
}: SecretInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn("relative flex items-center", wrapperClassName)}>
      <Input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        autoFocus={autoFocus}
        autoComplete="off"
        spellCheck={false}
        className={cn("pr-9", className)}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Hide value" : "Show value"}
        aria-pressed={visible}
        className="absolute right-1.5 text-outline hover:text-on-surface hover:bg-transparent"
      >
        {visible ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
}
