import useAuthStore from "@/zustand/authStore";
import useFavorite from "@/zustand/favoriteStore";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "./AppButton";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { notifyWarning } from "@/utils/notification";

export default function FavoriteButton({ productId, productName, className }) {
  const navigate = useNavigate();
  const id = String(productId);

  const isFavorite = useFavorite((state) => state.favoriteIds.includes(id));
  const loading = useFavorite((state) => state.loadingIds.includes(id));
  const getLike = useFavorite((state) => state.getLike);
  const getUnLike = useFavorite((state) => state.getUnLike);
  const user = useAuthStore((state) => state.user);
  const ischeckingAuth = useAuthStore((state) => state.ischeckingAuth);

  const handleClick = () => {
    if (ischeckingAuth || loading) return;

    if (!user) {
      notifyWarning("Vui lòng đăng nhập để yêu thích sản phẩm.");
      navigate("/login");
      return;
    }

    if (isFavorite) {
      getUnLike(productId);
    } else {
      getLike(productId);
    }
  };

  return (
    <AppButton
      type="text"
      loading={loading}
      disabled={loading || ischeckingAuth}
      aria-label={
        isFavorite ? `Bỏ yêu thích ${productName}` : `Yêu thích ${productName}`
      }
      aria-pressed={isFavorite}
      onClick={handleClick}
      className={cn(
        "flex! size-9! items-center! justify-center!",
        "rounded-full! border! border-border! bg-surface! p-0!",
        className,
      )}
      icon={
        <Heart
          aria-hidden="true"
          className={cn("size-4", isFavorite && "fill-current")}
          style={{
            color: isFavorite ? "var(--primary)" : "var(--muted-foreground)",
          }}
        />
      }
    ></AppButton>
  );
}
