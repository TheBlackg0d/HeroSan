import { useState } from "react";
import { FileUp } from "lucide-react";
import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#/components/ui/dialog";
import { Textarea } from "#/components/ui/textarea";
import { type DotenvEntry, parseDotenv, serializeDotenv } from "./envUtils";

type BulkEditDialogProps = {
  variables: EnvVariable[];
  onApply: (entries: DotenvEntry[]) => void;
};

export function BulkEditDialog({ variables, onApply }: BulkEditDialogProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setText(serializeDotenv(variables));
      setErrors([]);
    }
    setOpen(next);
  };

  const apply = () => {
    const result = parseDotenv(text);
    const duplicates = findDuplicates(result.entries);
    const allErrors = [
      ...result.errors,
      ...duplicates.map((key) => `${key} is defined more than once`),
    ];
    if (allErrors.length > 0) {
      setErrors(allErrors);
      return;
    }
    onApply(result.entries);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto px-space-md py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface hover:text-on-surface font-headline-sm text-(length:--text-headline-sm)"
        >
          <FileUp className="text-primary" />
          Bulk Edit / .env
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-surface-container-low text-on-surface ring-outline-variant/30">
        <DialogHeader>
          <DialogTitle className="font-headline-md text-(length:--text-headline-md)">
            Bulk edit variables
          </DialogTitle>
          <DialogDescription className="font-body-sm text-(length:--text-body-sm) text-on-surface-variant">
            Paste or edit a .env file. Keys you remove are deleted, new keys are
            added to all environments, and existing keys keep their scopes.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          spellCheck={false}
          aria-invalid={errors.length > 0 || undefined}
          aria-label=".env contents"
          placeholder="KEY=value"
          className="min-h-72 max-h-[60vh] border-0 bg-surface-container-lowest font-code-md text-(length:--text-code-md) md:text-(length:--text-code-md) text-on-surface"
        />
        {errors.length > 0 && (
          <ul className="flex flex-col gap-0.5 font-code-sm text-code-sm text-error">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <DialogFooter className="bg-surface-container border-outline-variant/20">
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={apply}
            className="bg-primary-container hover:bg-inverse-primary text-on-primary"
          >
            Apply changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function findDuplicates(entries: DotenvEntry[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const { key } of entries) {
    if (seen.has(key)) duplicates.add(key);
    seen.add(key);
  }
  return [...duplicates];
}
