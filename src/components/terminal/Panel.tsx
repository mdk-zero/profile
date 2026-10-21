import { cn } from "@/lib/utils";

type PanelProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & {
  title: string;
  titleAs?: "h2" | "h3" | "span";
  titleId?: string;
  // Server-rendered initial focus; FocusFollows moves it afterwards.
  focused?: boolean;
};

// A tiled terminal window, with its title cut into the top border like a TUI pane.
export function Panel({
  title,
  titleAs: Title = "h2",
  titleId,
  focused,
  className,
  children,
  ...rest
}: PanelProps) {
  return (
    <div
      data-panel=""
      data-focused={focused ? "" : undefined}
      className={cn("panel", className)}
      {...rest}
    >
      <Title id={titleId} className="panel-title">
        {title}
      </Title>
      {children}
    </div>
  );
}
