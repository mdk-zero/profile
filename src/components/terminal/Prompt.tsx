import { cn } from "@/lib/utils";

type PromptProps = {
  command?: string;
  // Types the command out once on page load.
  typed?: boolean;
  // Ends the line with a blinking cursor, like a fresh prompt waiting for input.
  cursor?: boolean;
  className?: string;
};

// A shell prompt line. Decorative, so it is hidden from screen readers.
export function Prompt({ command, typed, cursor, className }: PromptProps) {
  return (
    <p aria-hidden="true" className={cn("text-dim", className)}>
      <span>mdk0@arch ~ $</span>
      {command && (
        <>
          {" "}
          <span
            className={cn("text-fg", typed && "type-cmd")}
            style={typed ? ({ "--chars": command.length } as React.CSSProperties) : undefined}
          >
            {command}
          </span>
        </>
      )}
      {cursor && (
        <>
          {" "}
          <span className="cursor">&nbsp;</span>
        </>
      )}
    </p>
  );
}
