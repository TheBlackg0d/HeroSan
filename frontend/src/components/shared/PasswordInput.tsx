import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

type PasswordInputProps = Omit<React.ComponentProps<"input">, "type">;

export function PasswordInput({ ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <InputGroup>
      <InputGroupInput
        type={showPassword ? "text" : "password"}
        {...props}
        className="w-90"
      />
      <InputGroupAddon align="inline-end">
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="w-10"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </InputGroupAddon>
    </InputGroup>
  );
}
