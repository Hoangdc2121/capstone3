import { useEffect } from "react";
import { Heart } from "lucide-react";

import AppButton from "@/common/AppButton";
import ProductList from "@/product/ProductList";
import useFavorite from "@/zustand/favoriteStore";
import ProfileEmpty from "./ProfileEmpty";

export default function ProfileFavorites() {
  const products = useFavorite((state) => state.favoriteProducts);
  const loading = useFavorite((state) => state.favoritesLoading);
  const error = useFavorite((state) => state.favoritesError);
  const getFavoriteProducts = useFavorite((state) => state.getFavoriteProducts);

  // Làm mới danh sách khi mở tab yêu thích
  useEffect(() => {
    getFavoriteProducts();
  }, [getFavoriteProducts]);

  return (
    <section
      aria-labelledby="profile-favorites-title"
      className="rounded-2xl border border-border bg-surface p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id="profile-favorites-title"
          className="font-heading text-3xl uppercase text-foreground"
        >
          Sản phẩm yêu thích
        </h2>

        {!loading && !error && (
          <span className="text-sm text-muted-foreground">
            {products.length} sản phẩm
          </span>
        )}
      </div>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Những đôi sneaker bạn đã lưu để xem lại sau.
      </p>

      <div className="mt-5 border-t border-border pt-5">
        {loading ? (
          <p
            role="status"
            className="py-10 text-center text-sm text-muted-foreground"
          >
            Đang tải sản phẩm yêu thích...
          </p>
        ) : error ? (
          <div className="py-10 text-center">
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>

            <AppButton
              className="mt-5 normal-case!"
              onClick={() => getFavoriteProducts()}
            >
              Thử lại
            </AppButton>
          </div>
        ) : products.length === 0 ? (
          <ProfileEmpty
            icon={Heart}
            title="Bạn chưa lưu sản phẩm nào"
            description="Lưu những đôi sneaker yêu thích để dễ dàng tìm lại."
          />
        ) : (
          <ProductList
            products={products}
            showPrice={false}
            className="lg:grid-cols-2 xl:grid-cols-3"
          />
        )}
      </div>
    </section>
  );
}
