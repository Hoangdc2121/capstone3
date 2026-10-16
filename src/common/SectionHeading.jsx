import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function SectionHeading({
  id,
  title,
  description,
  to,
  linkText = "Xem tất cả",
  onLinkClick,
  className,
}) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-wrap items-end justify-between gap-4",
        className,
      )}
    >
      <div>
        <h2
          id={id}
          className="font-heading text-3xl uppercase text-foreground sm:text-4xl"
        >
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {to && (
        <Link
          to={to}
          onClick={onLinkClick}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
        >
          {linkText}
          <ArrowRight
            aria-hidden="true"
            className="size-5 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
}
