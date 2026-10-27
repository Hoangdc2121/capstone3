import AppButton from "@/common/AppButton";
import { AnimatedThemeToggle } from "@/components/ui/animated-theme-toggle";

import { Search, ShoppingCart } from "lucide-react";
import AccountMenu from "./AccountMenu";
import { cn } from "@/lib/utils";
import useCartStore from "@/zustand/cartStore";
import { useNavigate } from "react-router-dom";
import useCartCount from "@/hooks/useCartCount";

export default function HeaderActions({ closeMenu, searchOpen, onOpenSearch }) {
  // # Tìm kiếm, giỏ hàng, tài khoản, theme

  const navigate = useNavigate();

  const cartCount = useCartCount();
  const iconClass =
    "inline-flex items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-sm transition-colors hover:border-primary hover:text-primary";

  const actionButtonClass = cn(
    iconClass,
    "header-action-trigger relative flex! size-10! shrink-0 items-center justify-center rounded-full! p-0! gap-0! overflow-visible!",
  );
  return (
    <div className="flex shrink-0 items-center gap-1 sm:gap-2">
      {/* tìm kiếm sản phẩm */}
      <AppButton
        type="text"
        aria-label="Tìm kiếm sản phẩm"
        aria-expanded={searchOpen}
        aria-controls="header-search-panel"
        className={actionButtonClass}
        onClick={onOpenSearch}
        icon={
          <Search aria-hidden="true" className="header-action-icon size-5" />
        }
      />

      {/* giỏ hàng */}
      <AppButton
        type="text"
        aria-label={`Giỏ hàng có ${cartCount} đôi giày`}
        className={actionButtonClass}
        onClick={() => navigate("/cart")}
        icon={
          <ShoppingCart
            aria-hidden="true"
            className="header-action-icon size-5"
          />
        }
      >
        {cartCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-primary-foreground"
          >
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </AppButton>

      {/* tài khoản */}
      <AccountMenu onNavigate={closeMenu} />
      <AnimatedThemeToggle />
    </div>
  );
}
