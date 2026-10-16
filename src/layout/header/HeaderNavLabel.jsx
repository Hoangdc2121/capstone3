import GlowDot from "@/common/GlowDot";
import { cn } from "@/lib/utils";

export default function HeaderNavLabel({ active, children }) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-2 px-1 py-2",
        "whitespace-nowrap font-sans text-sm font-bold uppercase transition-colors",
        active
          ? "text-primary"
          : "text-muted-foreground group-hover:text-primary",
      )}
    >
      {active && <GlowDot />}
      {children}
    </span>
  );
}
