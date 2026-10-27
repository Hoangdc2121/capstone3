import AppButton from "@/common/AppButton";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CartEmpty() {
  const navigate = useNavigate();
  return (
    <section className="flex min-h-96 flex-col items-center justify-center px-4 py-16 text-center">
      <span className="flex size-20 items-center justify-center rounded-full border border-border bg-secondary text-primary">
        <ShoppingCart aria-hidden="true" className="size-9" strokeWidth={1.5} />
      </span>

      <h2 className="mt-6 font-heading text-3xl uppercase text-foreground sm:text-4xl">
        Giỏ hàng của bạn đang trống
      </h2>

      <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
        Chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá những đôi sneaker và
        tìm lựa chọn dành cho bạn.
      </p>

      <AppButton className="mt-7" onClick={() => navigate("/shop")}>
        Khám phá sản phẩm
        <ArrowRight aria-hidden="true" className="size-4" />
      </AppButton>
    </section>
  );
}
