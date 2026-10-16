import AppButton from "@/common/AppButton";
import FavoriteButton from "@/common/FavoriteButton";
import { cn } from "@/lib/utils";
import getProductImage from "@/utils/getProductImage";
import React, { useState } from "react";

export default function ProductGallery({ productDetail }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const transforms =
    productDetail.detaildetailedImages?.length > 0
      ? productDetail.detaildetailedImages
      : ["rotate(0deg)"];

  const selectedTransform = transforms[selectedIndex] || transforms[0];
  return (
    <section className="min-w-0">
      <div className="relative flex aspect-689/516 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-image p-8 sm:p-12">
        <img
          src={getProductImage(productDetail.image)}
          alt={productDetail.name}
          fetchPriority="high"
          style={{ transform: selectedTransform }}
          className="h-full w-full object-contain drop-shadow-xl transition-transform duration-300 motion-reduce:transition-none"
        />

        <FavoriteButton
          productId={productDetail.id}
          productName={productDetail.name}
          className="absolute! right-4 top-4 z-10"
        />
      </div>

      <span className="my-4 block text-xs text-muted-foreground">
        Chọn góc xem 360°
      </span>
      <div
        role="group"
        aria-label="Chọn góc xem sản phẩm"
        className="mt-4 grid grid-cols-4 gap-3"
      >
        {transforms.map((transform, index) => {
          const active = selectedIndex === index;

          return (
            <AppButton
              key={`${transform}-${index}`}
              type="default"
              htmlType="button"
              aria-label={`Xem góc ${index + 1} của ${productDetail.name}`}
              aria-pressed={active}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "flex! aspect-square h-auto! w-full items-center! justify-center!",
                "overflow-hidden rounded-xl! border! bg-surface-image! p-3!",
                "[&>span]:flex [&>span]:h-full [&>span]:w-full",
                active
                  ? "border-primary!"
                  : "border-border! hover:border-primary/50!",
              )}
            >
              <img
                src={getProductImage(productDetail.image)}
                alt=""
                style={{ transform }}
                className="h-full w-full object-contain"
              />
            </AppButton>
          );
        })}
      </div>
    </section>
  );
}
