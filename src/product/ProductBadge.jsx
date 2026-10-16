import GlowDot from "@/common/GlowDot";
import { cn } from "@/lib/utils";

export default function ProductBadge({
  products,
  showStock = false,
  className,
}) {
  const badgeClassName = cn(
    "rounded-full bg-surface px-3 py-1 text-xs font-bold uppercase",
    className,
  );

  return showStock ? (
    <span
      className={cn(
        badgeClassName,
        "inline-flex items-center gap-2",
        products.quantity > 0
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-muted-foreground",
      )}
    >
      <GlowDot
        className={cn(
          "size-1.5 shrink-0",
          products.quantity > 0
            ? "bg-emerald-500 shadow-emerald-500/30"
            : "bg-muted-foreground shadow-none animate-none",
        )}
      />
      {products.quantity > 0
        ? `Còn hàng: ${products.quantity} đôi`
        : "Hết hàng"}
    </span>
  ) : (
    products.feature && (
      <span className={cn(badgeClassName, "text-primary")}>Nổi bật</span>
    )
  );
}
