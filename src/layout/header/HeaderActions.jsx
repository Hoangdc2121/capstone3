import AppButton from "@/common/AppButton";
import { AnimatedThemeToggle } from "@/components/ui/animated-theme-toggle";

import { Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import { cn } from "@/lib/utils";

export default function HeaderActions({ closeMenu, searchOpen, onOpenSearch }) {
  // # Tìm kiếm, giỏ hàng, tài khoản, theme

  const iconClass =
    "inline-flex w-8 h-8 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-sm transition-colors hover:border-primary hover:text-primary";
  return (
    <div className="flex shrink-0 items-center gap-1 sm:gap-2">
      {/* tìm kiếm sản phẩm */}
      <AppButton
        type="text"
        aria-label="Tìm kiếm sản phẩm"
        aria-expanded={searchOpen}
        aria-controls="header-search-panel"
        className={cn(iconClass, "header-search-trigger")}
        onClick={onOpenSearch}
        icon={
          <Search aria-hidden="true" className="header-search-icon size-5" />
        }
      />

      {/* giỏ hàng */}
      <Link to="/cart" aria-label="Giỏ hàng" className={iconClass}>
        <ShoppingCart aria-hidden="true" className="size-5" />
      </Link>

      {/* tài khoản */}
      <AccountMenu onNavigate={closeMenu} />
      <AnimatedThemeToggle />
    </div>
  );
}
