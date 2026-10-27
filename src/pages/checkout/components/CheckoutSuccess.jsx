import { Check, ClipboardList, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppButton from "@/common/AppButton";

export default function CheckoutSuccess() {
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby="checkout-success-title"
      className="mx-auto my-8 max-w-2xl rounded-2xl border border-border bg-surface px-5 py-10 text-center shadow-sm sm:my-12 sm:px-10 sm:py-12"
    >
      <span
        aria-hidden="true"
        className="mx-auto flex size-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      >
        <Check className="size-8" strokeWidth={2.5} />
      </span>

      <h1
        id="checkout-success-title"
        className="mt-7 font-heading text-4xl uppercase leading-tight text-foreground sm:text-5xl"
      >
        Đặt hàng thành công
      </h1>

      <div role="status" className="mt-4 text-sm leading-6">
        <p className="font-medium text-foreground">
          Đơn hàng của bạn đã được ghi nhận.
        </p>

        <p className="mt-1 text-muted-foreground">
          Cảm ơn bạn đã lựa chọn Sneaker Hub.
        </p>
      </div>

      <div aria-hidden="true" className="mx-auto my-7 h-px w-12 bg-border" />

      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <AppButton
          onClick={() => navigate("/shop", { replace: true })}
          className="w-full normal-case! sm:w-auto"
          icon={<ShoppingBag aria-hidden="true" className="size-4" />}
        >
          Tiếp tục mua sắm
        </AppButton>

        <AppButton
          type="default"
          onClick={() => navigate("/profile?tab=orders", { replace: true })}
          className="w-full normal-case! sm:w-auto"
          icon={<ClipboardList aria-hidden="true" className="size-4" />}
        >
          Xem lịch sử đơn hàng
        </AppButton>
      </div>

      <p className="mx-auto mt-6 max-w-sm text-xs leading-5 text-muted-foreground text-nowrap">
        Bạn có thể xem lại đơn hàng trong mục{" "}
        <span className="text-primary">Tài khoản &gt; Lịch sử đơn hàng.</span>
      </p>
    </section>
  );
}
