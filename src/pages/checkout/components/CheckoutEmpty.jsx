import { Compass, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppButton from "@/common/AppButton";

export default function CheckoutEmpty() {
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby="checkout-empty-title"
      className="rounded-2xl border border-border bg-surface px-5 py-12 text-center sm:px-8 sm:py-16"
    >
      <span
        aria-hidden="true"
        className="mx-auto flex size-18 items-center justify-center rounded-2xl bg-secondary text-muted-foreground"
      >
        <ShoppingCart className="size-9" strokeWidth={1.7} />
      </span>

      <h2
        id="checkout-empty-title"
        className="mx-auto mt-6 max-w-lg font-heading text-3xl uppercase leading-tight text-foreground sm:text-4xl"
      >
        Không có sản phẩm để đặt hàng
      </h2>

      <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground">
        Bạn chưa chọn sản phẩm nào để đặt mua. Hãy chọn sản phẩm trong giỏ hàng
        hoặc khám phá thêm những đôi sneaker bạn yêu thích.
      </p>

      <AppButton
        className="mt-7 normal-case!"
        onClick={() => navigate("/shop")}
        icon={<Compass aria-hidden="true" className="size-4" />}
      >
        Khám phá sản phẩm
      </AppButton>
    </section>
  );
}
