import { cn } from "@/lib/utils";

export default function GlowDot({ className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "size-1.5 shrink-0 animate-pulse rounded-full bg-primary",
        "shadow-[0_0_8px_2px] shadow-primary/40",
        className,
      )}
    />
  );
}
