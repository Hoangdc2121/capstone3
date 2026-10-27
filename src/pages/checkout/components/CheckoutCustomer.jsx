import { UserRound } from "lucide-react";

export default function CheckoutCustomer({ user }) {
  return (
    <section
      aria-labelledby="checkout-customer-title"
      className="rounded-2xl border border-border bg-surface p-5 sm:p-6"
    >
      <div className="flex items-center gap-2">
        <UserRound
          aria-hidden="true"
          className="size-4 shrink-0 text-foreground"
        />

        <h2
          id="checkout-customer-title"
          className="font-heading text-2xl uppercase text-foreground"
        >
          Thông tin người đặt
        </h2>
      </div>

      <dl className="mt-5 grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
        <div className="min-w-0">
          <dt className="text-sm font-medium uppercase text-muted-foreground">
            Họ và tên
          </dt>

          <dd className="mt-2 wrap-break-word text-base font-bold text-foreground">
            {user.name?.trim() || "Chưa cập nhật"}
          </dd>
        </div>

        <div className="min-w-0">
          <dt className="text-sm font-medium uppercase text-muted-foreground">
            Email tài khoản
          </dt>

          <dd className="mt-2  wrap-break-word text-base font-bold text-foreground">
            {user.email}
          </dd>

          <dd className="mt-1 text-xs leading-5 text-muted-foreground italic">
            Email tài khoản dùng để đặt hàng & nhận thông báo trạng thái
          </dd>
        </div>

        <div className="min-w-0">
          <dt className="text-sm font-medium uppercase text-muted-foreground">
            Số điện thoại
          </dt>

          <dd className="mt-2 wrap-break-word text-base font-bold text-foreground">
            {user.phone?.trim() || "Chưa cập nhật"}
          </dd>
        </div>
      </dl>
    </section>
  );
}
