import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function CheckoutHeader({ source, product }) {
  const slug = product
    ? product.alias || product.name.trim().toLowerCase().replace(/\s+/g, "-")
    : "";

  const fromBuyNow = source === "buyNow" && Boolean(product);

  const backUrl = fromBuyNow
    ? `/detail/${product.productId}/${encodeURIComponent(slug)}`
    : "/cart";

  return (
    <section className="mb-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1
            id="checkout-title"
            className="font-heading text-4xl uppercase text-foreground sm:text-5xl"
          >
            Xác nhận đặt hàng
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Kiểm tra sản phẩm và thông tin tài khoản trước khi đặt hàng.
          </p>
        </div>

        <Link
          to={backUrl}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-muted-foreground! transition-colors hover:text-primary!"
        >
          <ArrowLeft
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:-translate-x-1"
          />

          {fromBuyNow ? "Quay lại sản phẩm" : "Quay lại giỏ hàng"}
        </Link>
      </div>
    </section>
  );
}
