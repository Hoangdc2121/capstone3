import AppButton from "@/common/AppButton";
import useCartSummary from "@/hooks/useCartSummary";

export default function CartSummary({
  title = "Tóm tắt giỏ hàng",
  titleIcon,
  updating = false,
  onCheckout,
  buttonText = "Tiến hành thanh toán",
  loading = false,
  error = null,
}) {
  const { selectedItems, totalQuantity, subtotal } = useCartSummary();

  return (
    <aside
      aria-labelledby="cart-summary-title"
      className="rounded-2xl border border-border bg-surface p-5 sm:p-6 lg:sticky lg:top-6"
    >
      <div className="flex items-center gap-2">
        {titleIcon}

        <h2 className="font-heading text-3xl uppercase text-foreground">
          {title}
        </h2>
      </div>

      <dl className="mt-6 space-y-4 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Sản phẩm đã chọn</dt>
          <dd className="font-semibold text-foreground">
            {selectedItems.length}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Số lượng</dt>
          <dd className="font-semibold text-foreground">{totalQuantity} đôi</dd>
        </div>

        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Tạm tính</dt>
          <dd className="font-semibold text-foreground">
            {subtotal.toLocaleString("en-US")} $
          </dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-border pt-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-foreground">
            Tổng tiền sản phẩm
          </p>

          <p
            aria-live="polite"
            className="font-heading text-4xl leading-none text-primary"
          >
            {subtotal.toLocaleString("en-US")} $
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-destructive/10 p-3 text-sm leading-6 text-destructive"
          >
            {error}
          </p>
        )}

        <AppButton
          loading={loading}
          disabled={selectedItems.length === 0 || updating}
          onClick={onCheckout}
          className="mt-6 w-full normal-case!"
        >
          {loading ? "Đang đặt hàng..." : buttonText}
        </AppButton>

        {selectedItems.length === 0 && (
          <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
            Vui lòng chọn sản phẩm để thanh toán.
          </p>
        )}
      </div>
    </aside>
  );
}
