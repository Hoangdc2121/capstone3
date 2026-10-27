import { useState } from "react";
import { Drawer } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Home, Menu, ShoppingBag, ShoppingCart, X } from "lucide-react";

import AppButton from "@/common/AppButton";
import { useHeaderNavigation } from "@/hooks/useHeaderNavigation";
import { AnimatedThemeToggle } from "@/components/ui/animated-theme-toggle";
import { VercelTabs } from "@/components/ui/vercel-tabs";

import AccountMenu from "./AccountMenu";
import ProductSearchContent from "./ProductSearchContent";
import useCartCount from "@/hooks/useCartCount";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const cartCount = useCartCount();

  const { pathname, isProductPage, isFeatured } = useHeaderNavigation();

  const closeMenu = () => setOpen(false);

  const menuItems = [
    {
      label: "Trang chủ",
      value: "home",
      to: "/",
      icon: Home,
    },
    {
      label: "Tất cả sản phẩm",
      value: "products",
      to: "/shop",
      icon: ShoppingBag,
    },
  ];

  let activeTab = null;
  if (pathname === "/") {
    activeTab = "home";
  } else if (isProductPage) {
    activeTab = isFeatured ? "featured" : "products";
  }

  return (
    <>
      {/* Nút mở menu */}
      <AppButton
        type="text"
        htmlType="button"
        className="mobile-menu-trigger lg:hidden"
        aria-label="Mở menu điều hướng"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        icon={<Menu aria-hidden="true" className="mobile-menu-icon size-5" />}
      />

      <div className="flex min-h-full w-full flex-col">
        <Drawer
          placement="right"
          open={open}
          onClose={closeMenu}
          closable={false}
          title={null}
          styles={{
            body: {
              padding: 0,
              background: "var(--background)",
            },
            wrapper: {
              width: "min(360px, 100vw)",
            },
          }}
        >
          <div className="flex min-h-full flex-col font-sans text-foreground">
            {/* nút đóng */}
            <div className="flex justify-end px-5 pb-5 pt-6">
              <AppButton
                type="text"
                htmlType="button"
                size="small"
                className="drawer-close-button"
                aria-label="Đóng menu"
                onClick={closeMenu}
                style={{
                  width: 32,
                  height: 32,
                  padding: 0,
                  borderRadius: "50%",
                }}
                icon={
                  <X aria-hidden="true" className="drawer-close-icon size-4" />
                }
              />
            </div>

            {/* Lối vào tìm kiếm */}
            <div className="px-5">
              <ProductSearchContent open={open} onClose={closeMenu} />
            </div>

            {/* Menu chính */}
            <nav
              aria-label="Điều hướng trên điện thoại"
              className="px-5 pb-6 pt-6"
            >
              <p className="mb-3 px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Khám phá
              </p>

              <VercelTabs
                tabs={menuItems}
                activeTab={activeTab}
                orientation="vertical"
                showUnderline={false}
                onNavigate={closeMenu}
              />

              {/* Khối giỏ hàng: dùng div để không lồng Button trong Link */}
              <VercelTabs
                className="mt-3"
                orientation="vertical"
                showUnderline={false}
                activeTab={pathname === "/cart" ? "cart" : null}
                onNavigate={closeMenu}
                tabs={[
                  {
                    label: `Giỏ hàng của bạn${cartCount > 0 ? ` (${cartCount})` : ""}`,
                    value: "cart",
                    to: "/cart",
                    icon: ShoppingCart,
                    showDot: true,
                  },
                ]}
              />
            </nav>

            {/* Tài khoản */}
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-border bg-surface px-4 py-4">
              <div className="min-w-0 flex-1">
                <AccountMenu onNavigate={closeMenu} />
              </div>

              <div className="shrink-0 border-l border-border pl-3">
                <AnimatedThemeToggle />
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
}
