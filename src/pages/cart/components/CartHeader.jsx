import SectionHeading from "@/common/SectionHeading";
import React from "react";

export default function CartHeader({ count = 0 }) {
  return (
    <section className="mb-6 border-b border-border pb-6">
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1
              id="cart-title"
              className="font-heading text-4xl uppercase leading-none text-foreground sm:text-5xl"
            >
              Giỏ hàng của bạn
            </h1>

            {count > 0 && (
              <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                {count} mặt hàng
              </span>
            )}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Những lựa chọn cho bước đi tiếp theo.
          </p>
        </div>

        <SectionHeading
          to="/shop"
          linkText="Tiếp tục mua sắm"
          className="mb-0"
        />
      </div>
    </section>
  );
}
