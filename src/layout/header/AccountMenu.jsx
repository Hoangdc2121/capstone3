import AppButton from "@/common/AppButton";
import useAuthStore from "@/zustand/authStore";
import { Dropdown } from "antd";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AccountMenu({ onNavigate }) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const displayName = user?.name?.trim() || user?.email || "Tài khoản";
  const initials = displayName
    .split(/\s+/)
    .slice(-2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const accountMenu = {
    items: [
      {
        key: "profile",
        label: "Tài khoản của tôi",
        icon: <UserRound className="size-4" />,
      },
      { type: "divider" },
      {
        key: "logout",
        label: "Đăng xuất",
        icon: <LogOut className="size-4" />,
        danger: true,
      },
    ],
    onClick: ({ key }) => {
      if (key === "profile") {
        onNavigate?.();
        navigate("/profile");
      }

      if (key === "logout") {
        logout();
        onNavigate?.();
        navigate("/login", { replace: true });
      }
    },
  };
  return (
    <div className="min-w-0">
      {user ? (
        <Dropdown
          menu={accountMenu}
          trigger={["click"]}
          placement="bottomRight"
          classNames={{ root: "account-dropdown" }}
        >
          <AppButton
            type="text"
            htmlType="button"
            aria-label={`Menu tài khoản ${displayName}`}
            className="group h-auto! rounded-full! bg-foreground! py-1! pl-1! pr-3! text-background! normal-case! hover:bg-primary! hover:text-white!"
          >
            <span className="flex items-center gap-2.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-background/30 bg-primary text-sm font-bold text-white">
                {initials}
              </span>

              <span className="flex min-w-0 max-w-40 flex-col text-left">
                <span className="truncate text-sm font-bold leading-5">
                  {displayName}
                </span>

                <span className="truncate text-xs font-normal leading-4 opacity-70">
                  {user.email}
                </span>
              </span>

              <ChevronDown
                aria-hidden="true"
                className="ml-1 size-4 shrink-0 opacity-70 transition-opacity group-hover:opacity-100"
              />
            </span>
          </AppButton>
        </Dropdown>
      ) : (
        <Link
          to="/login"
          className="inline-flex items-center gap-2 rounded-full bg-foreground py-1 pl-1 pr-3 text-background transition-colors hover:bg-primary hover:text-white"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-background/15">
            <UserRound aria-hidden="true" className="size-4" />
          </span>
          <span className="text-sm font-bold uppercase">Đăng nhập</span>
        </Link>
      )}
    </div>
  );
}
