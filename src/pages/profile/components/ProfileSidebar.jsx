import { useState } from "react";
import { Avatar } from "antd";
import { Heart, LogOut, ShoppingBag, UserRound } from "lucide-react";
import AppButton from "@/common/AppButton";
import { VercelTabs } from "@/components/ui/vercel-tabs";

export default function ProfileSidebar({
  user,
  activeTab,
  onTabChange,
  onLogout,
}) {
  const [failedAvatar, setFailedAvatar] = useState(null);

  const displayName = user.name?.trim() || "Tài khoản";
  const avatarUrl = user.avatar || user.image;

  const initials = (user.name?.trim() || user.email || "TK")
    .split(/\s+/)
    .slice(-2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const tabs = [
    {
      label: "Thông tin cá nhân",
      value: "info",
      icon: UserRound,
      showDot: false,
    },
    {
      label: "Lịch sử đơn hàng",
      value: "orders",
      icon: ShoppingBag,
      showDot: false,
    },
    {
      label: "Sản phẩm yêu thích",
      value: "favorites",
      icon: Heart,
      showDot: false,
    },
  ];

  return (
    <aside
      aria-label="Menu tài khoản"
      className="min-w-0 rounded-2xl border border-border bg-surface p-5"
    >
      <div className="text-center">
        <Avatar
          size={72}
          src={avatarUrl && failedAvatar !== avatarUrl ? avatarUrl : undefined}
          onError={() => {
            setFailedAvatar(avatarUrl);
            return false;
          }}
          className="border-2! border-primary/30! bg-secondary! font-bold! text-primary!"
        >
          {initials}
        </Avatar>

        <p className="mt-3 wrap-break-word text-lg font-bold text-foreground">
          {displayName}
        </p>

        <p className="mt-1 break-all text-xs leading-5 text-muted-foreground">
          {user.email}
        </p>
      </div>

      <div className="mt-5 border-t border-border pt-5">
        <VercelTabs
          mode="selection"
          orientation="vertical"
          ariaLabel="Các mục tài khoản"
          tabs={tabs}
          activeTab={activeTab}
          onValueChange={onTabChange}
          showUnderline={false}
        />
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <AppButton
          type="text"
          className="w-full justify-start! text-destructive! normal-case! hover:bg-destructive/10!"
          icon={<LogOut aria-hidden="true" className="size-4" />}
          onClick={onLogout}
        >
          Đăng xuất tài khoản
        </AppButton>
      </div>
    </aside>
  );
}
