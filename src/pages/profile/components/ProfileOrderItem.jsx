import getProductImage from "@/utils/getProductImage";

export default function ProfileOrderItem({ order }) {
  const products = Array.isArray(order.orderDetail) ? order.orderDetail : [];

  const date = new Date(order.date);
  const formattedDate = Number.isNaN(date.getTime())
    ? "Chưa có thông tin"
    : date.toLocaleString("vi-VN");

  return (
    <article className="rounded-xl border border-border p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-foreground">
            Đơn hàng #{order.id}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Ngày đặt: {formattedDate}
          </p>
        </div>

        <span className="text-xs text-muted-foreground">
          {products.length} dòng sản phẩm
        </span>
      </div>

      <ul className="mt-4 divide-y divide-border border-t border-border">
        {products.map((product, index) => (
          <li
            key={`${order.id}-${index}`}
            className="flex items-center gap-3 py-4 last:pb-0 sm:gap-4"
          >
            <div className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-surface-image p-2 sm:size-24">
              <img
                src={getProductImage(product.image)}
                alt={product.name}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-base font-bold uppercase text-foreground">
                {product.name}
              </p>

              <p className="mt-2 text-base text-muted-foreground">
                Giá: {Number(product.price).toLocaleString("en-US")} $
              </p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
