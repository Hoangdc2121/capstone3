import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function HeaderLogo({ compact = false }) {
  // # Logo và tên SNEAKER HUB
  return (
    <Link
      to="/"
      aria-label="SNEAKER HUB — Trang chủ"
      className={cn(
        "group inline-flex shrink-0 items-center",
        compact ? "gap-2" : "gap-3",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex items-center justify-center rounded-xl bg-primary font-heading leading-none text-white",
          "shadow-md shadow-primary/20 transition-transform duration-150 ease-in-out group-hover:-translate-y-1 group-hover:scale-110",
          compact ? "size-7 text-lg" : "size-9 text-2xl",
        )}
      >
        S
      </span>

      <span
        className={cn(
          "font-heading leading-none tracking-wide text-foreground transition-colors duration-200 group-hover:text-primary",
          compact ? "text-xl" : "text-3xl",
        )}
      >
        SNEAKER HUB
      </span>
    </Link>
  );
}
