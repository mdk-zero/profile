import { cn } from "@/lib/utils";

export type IconName = "github" | "globe" | "linkedin" | "mail";

// Renders a public/icons PNG as a mask filled with the current text colour.
export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("icon", className)}
      style={{ "--icon": `url(/icons/${name}.png)` } as React.CSSProperties}
    />
  );
}
