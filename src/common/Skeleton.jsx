import { cn } from "@/lib/utils";

export default function Skeleton({ className, ...props }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded bg-foreground/10 motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}
