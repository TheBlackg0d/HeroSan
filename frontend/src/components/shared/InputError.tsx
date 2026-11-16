import { TriangleExclamationPoint } from "lucide-react";

type InputErrorProps = {
  message?: string;
};

export function InputError({ message }: InputErrorProps) {
  if (!message) return null;
  return (
    <p className="text-error flex gap-1 items-center">
      <TriangleExclamationPoint size={16} />
      {message}
    </p>
  );
}
