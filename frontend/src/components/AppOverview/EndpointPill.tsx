import { useEffect, useRef, useState } from "react";
import { Check, Copy, ExternalLink, Lock } from "lucide-react";
import { Button } from "#/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#/components/ui/tooltip";

const COPIED_RESET_MS = 2000;

export function EndpointPill({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  async function copyEndpoint() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  }

  return (
    <div className="flex items-center gap-1.5 px-space-sm py-1 rounded-lg bg-surface-container-low max-w-full overflow-hidden">
      <Lock size={15} className="shrink-0 text-outline" />
      <span className="font-code-sm text-code-sm text-on-surface truncate">
        {url}
      </span>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Copy endpoint"
            onClick={copyEndpoint}
            className="text-outline hover:text-on-surface hover:bg-surface-container"
          >
            {copied ? <Check className="text-tertiary" /> : <Copy />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{copied ? "Copied!" : "Copy endpoint"}</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant="ghost"
            size="icon-xs"
            className="text-outline hover:text-secondary hover:bg-surface-container"
          >
            <a href={url} target="_blank" rel="noreferrer" aria-label="Open live URL">
              <ExternalLink />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Open live URL</TooltipContent>
      </Tooltip>
    </div>
  );
}
