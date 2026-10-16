import AppButton from "@/common/AppButton";
import { cn } from "@/lib/utils";
import ProductBadge from "@/product/ProductBadge";
import { notifyWarning } from "@/utils/notification";
import useAuthStore from "@/zustand/authStore";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductInfo({ productDetail, onAddToCart, onBuyNow }) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const ischeckingAuth = useAuthStore((state) => state.ischeckingAuth);

  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState("");

  const sizes = Array.isArray(productDetail.size) ? productDetail.size : [];
  const stock = Math.max(0, Math.floor(Number(productDetail.quantity) || 0));
  const outOfStock = stock === 0;
  const categoryLabel = (productDetail.categories || [])
    .map((category) => category.category.replaceAll("_", " "))
    .join(" · ");

  const handleSelectSize = (size) => {
    setSelectedSize(size);
    setSizeError("");
  };

  const handlePurchase = (action) => {
    if (ischeckingAuth || outOfStock) return;

    if (selectedSize === null) {
      setSizeError("Vui lòng chọn size giày,");
      return;
    }

    if (!user) {
      notifyWarning("Vui lòng đăng nhập để mua sản phẩm.");
      navigate("/login");
      return;
    }

    if (!action) {
      notifyWarning("Chức năng giỏ hàng đang được hoàn thiện.");
      return;
    } // khi làm xong trang thanh toán và giỏ hàng thì sửa

    action({
      product,
      size: selectedSize,
      quantity,
    });
  };
  return (
    <section
      aria-labelledby="product-title"
      className="min-w-0 rounded-2xl border border-border bg-surface p-5 font-sans shadow-sm sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {categoryLabel}
        </p>

        <ProductBadge products={productDetail} showStock />
      </div>
      <h1
        id="product-title"
        className="mt-3 font-heading text-4xl uppercase leading-none text-foreground sm:text-5xl"
      >
        {productDetail.name}
      </h1>

      <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
        <p className="font-heading text-4xl leading-none text-primary">
          {productDetail.price.toLocaleString("en-US")} $
        </p>

        <span className="text-xs text-muted-foreground">
          Giá niêm yết chính thức
        </span>
      </div>

      <p className="mt-5 text-sm leading-6 text-muted-foreground">
        {productDetail.shortDescription}
      </p>

      <div className="mt-6 border-t border-border pt-6">
        <fieldset
          aria-describedby={sizeError ? "product-size-error" : undefined}
        >
          <legend className="sr-only">Chọn size giày</legend>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase text-foreground">
              Chọn size <span className="text-primary">*</span>
            </p>

            <span className="text-xs text-muted-foreground">
              {selectedSize === null ? "Chưa chọn" : `Đã chọn: ${selectedSize}`}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2">
            {sizes.map((size) => (
              <AppButton
                key={size}
                type="default"
                disabled={outOfStock}
                aria-pressed={selectedSize === size}
                onClick={() => handleSelectSize(size)}
                className={cn(
                  "w-full rounded-xl! px-2!",
                  selectedSize === size
                    ? "border-primary! bg-primary/10! text-primary!"
                    : "border-border! bg-background! text-foreground! hover:border-primary! hover:text-primary!",
                )}
              >
                {size}
              </AppButton>
            ))}
          </div>

          {sizes.legend === 0 && (
            <p className="mt-3 text-xs text-muted-foreground">
              Chưa có thông tin size.
            </p>
          )}

          {sizeError && (
            <p
              id="product-size-error"
              role="alert"
              className="mt-2 text-xs text-destructive"
            >
              {sizeError}
            </p>
          )}
        </fieldset>

        {/* chọn số lượng  */}

        {/* thao tác mua */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <AppButton
            type="default"
            htmlType="button"
            disabled={outOfStock || sizes.length === 0 || ischeckingAuth}
            className="w-full border-primary! text-primary! normal-case!"
            icon={<ShoppingBag aria-hidden="true" className="size-4" />}
            onClick={() => handlePurchase(onAddToCart)}
          >
            Thêm vào giỏ
          </AppButton>

          <AppButton
            htmlType="button"
            disabled={outOfStock || sizes.length === 0 || ischeckingAuth}
            className="w-full normal-case!"
            onClick={() => handlePurchase(onBuyNow)}
          >
            Mua ngay
          </AppButton>
        </div>
      </div>
    </section>
  );
}
