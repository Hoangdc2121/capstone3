import { ShoppingBag } from "lucide-react";
import ProfileOrderItem from "./ProfileOrderItem";
import ProfileEmpty from "./ProfileEmpty";

export default function ProfileOrderHistory({ orders = [] }) {
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <section
      aria-labelledby="profile-orders-title"
      className="rounded-2xl border border-border bg-surface p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id="profile-orders-title"
          className="font-heading text-3xl uppercase text-foreground"
        >
          Lịch sử đơn hàng
        </h2>

        <span className="text-sm text-muted-foreground">
          {orders.length} đơn hàng
        </span>
      </div>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Xem lại những đơn hàng bạn đã đặt tại Sneaker Hub.
      </p>

      {sortedOrders.length === 0 ? (
        <div className="mt-5 border-t border-border">
          <ProfileEmpty
            icon={ShoppingBag}
            title="Bạn chưa có đơn hàng nào"
            description="Khám phá bộ sưu tập và tìm đôi sneaker dành cho bạn."
          />
        </div>
      ) : (
        <div className="mt-5 space-y-4 border-t border-border pt-5">
          {sortedOrders.map((order) => (
            <ProfileOrderItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </section>
  );
}
