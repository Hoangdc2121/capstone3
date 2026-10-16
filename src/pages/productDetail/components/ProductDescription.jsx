import React from "react";

export default function ProductDescription({ description }) {
  return (
    <section
      aria-labelledby="product-description-title"
      className="mt-8 rounded-2xl border border-border bg-surface p-5 sm:p-8"
    >
      <h2
        id="product-description-title"
        className="flex items-center gap-2 font-heading text-2xl uppercase text-foreground sm:text-3xl"
      >
        <span
          aria-hidden="true"
          className="h-5 w-1.5 shrink-0 rounded-full bg-primary"
        />
        Mô tả sản phẩm
      </h2>
      <p className="mt-5 whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-base">
        {description?.trim() || "chưa có mô tả sản phẩm này"}
      </p>
    </section>
  );
}
